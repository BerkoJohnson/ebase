const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  let error;
  if (!req.headers.authorization) {
    error = {
      message: "No authorization token found."
    };
    return next(error);
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    req['user'] = {
      _id: decoded._id
    }
    next();
  }
};
