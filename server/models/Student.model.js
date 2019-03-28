// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const studentSchema = new Schema({
//   name: {
//     type: String,
//     trim: true,
//     required: true
//   },
//   dob: {
//     type: String
//   },
//   yearOfAdmission: {
//     type: Number,
//     default: new Date().getFullYear()
//   },
//   room: {
//     type: Schema.Types.ObjectId,
//     ref: 'Room'
//   }
// }, {
//   timestamps: true
// });
//
// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  dob: {
    type: String
  },
  yearOfAdmission: {
    type: Number,
    default: new Date().getFullYear()
  },
  room: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
