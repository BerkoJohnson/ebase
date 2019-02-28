const jwt = require('jsonwebtoken');
const config = require('../config');
module.exports = {
  generateToken(user) {

    // let expiry = new Date();
    // expiry.setDate(expiry.getDate() + 1);
    // console.log(parseInt(expiry.getTime() / 1000) , new Date().getDate());

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id
    };
    return jwt.sign(payload, config.secret, {
      expiresIn: '12h'
    });
  }
};

