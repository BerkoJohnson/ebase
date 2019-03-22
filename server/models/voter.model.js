const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voterSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  pin: {
    type: Number
  },
  loggedIn: {
    type: Boolean,
    default: false
  },
  voted: {
    type: Boolean,
    default: false
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Voter', voterSchema);
