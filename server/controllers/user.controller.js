/*eslint no-undef: "error"*/
/*eslint-env node*/
const mongoose = require("mongoose");
const crypto = require("crypto");
const _ = require("lodash");

const User = require("../models/user.model");
const helpers = require("../helpers");
const userService = require("../services/user.service");

exports.getAll = async function (req, res) {
  try {
    const users = await userService.getStudents();
    res.json(users);
  } catch (error) {
    res.json({
      error: error
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const body = _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password"
    ]);

    const user = new User(body);

    user
      .save()
      .then(() => {
        return user.generateToken();
      })
      .then(token => {
        res.header("x-auth", token).send(user);
      });
  } catch (error) {
    // console.log(JSON.stringify(error, 0, 2));
    res.status(401).send({
      error
    });
  }
};

exports.get = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getStudent(id);
    res.json(user);
  } catch (error) {
    res.json({
      error: error
    });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await userService.findStudentByKeyForAuth({
      email
    });
    // const user = await User.findOne({
    // 	email: email
    // }).exec();

    if (user) {
      const hashedPassword = crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
        .toLocaleString("hex");
      // const valid = bcrypt.compareSync(password, user.hashed);
      const valid = user.hashed === hashedPassword;

      if (!valid) {
        return res.status(400).json({
          message: "Wrong Password"
        });
      } else {
        const token = helpers.generateToken(user);
        return res.json({
          token
        });
      }
    } else {
      return res.status(404).send({
        message: "Not Found"
      });
    }
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

exports.findMe = (req, res) => {
  res.send(req.user);
};

exports.login = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateToken()
        .then((token) => {
          res.header('x-auth', token).send(user);
        })
    })
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
};

exports.logout = (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    })
}
