// eslint-disable-next-line no-undef
// const User = require('../models/users.model');

//
// // eslint-disable-next-line no-undef
// exports.getStudents = () => {
//   return User.find().select('firstName lastName email _id updatedAt createdAt').exec();
// };
//
// // eslint-disable-next-line no-undef
// exports.getStudent = (id) => {
//   return User.findById(id).select('firstName lastName email _id updatedAt createdAt').exec();
// };
//
// // eslint-disable-next-line no-undef
// exports.findStudentByKeyForAuth = (reqBody) => {
//   let obj = {};
//   for (const key of Object.keys(reqBody)) {
//     obj[key] = reqBody[key];
//   }
//   // eslint-disable-next-line no-console
//   return User.findOne(obj).exec();
// };
//
// // eslint-disable-next-line no-undef
// exports.findStudentByKey = (reqBody) => {
//   let obj = {};
//   for (const key of Object.keys(reqBody)) {
//     obj[key] = reqBody[key];
//   }
//   // eslint-disable-next-line no-console
//   // console.log(obj);
//   return User.findOne(obj).select('firstName lastName email _id updatedAt createdAt').exec();
// };
