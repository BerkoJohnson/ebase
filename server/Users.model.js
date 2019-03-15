const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  salt: {
    type: String,
    required: true
  },
  hashed: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

schema.methods.saveUser = function (password) {
  const user = this;
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  user.salt = salt;
  user.hashed = hash;
  return user.save();
};



schema.statics.verifyUser = function (email) {
  console.log("afdafdafdsa");
};

module.exports = mongoose.model("users", schema);
