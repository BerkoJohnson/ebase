const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("../config");

const schema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

schema.methods.generateToken = function () {
  const user = this;

  const access = "auth";
  const token = jwt
    .sign({
        _id: user._id.toHexString(),
        access
      },
      config.secret,
      {
        expiresIn: "7d"
      }
    )
    .toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  });
};

schema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ["_id", "email"]);
};


schema.methods.removeToken = function (token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
}

schema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, config.secret);
  } catch (error) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

schema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});


schema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    });
};

module.exports = mongoose.model("User", schema);
