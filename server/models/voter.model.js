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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Voter', voterSchema);
