const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }],
  hod: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Department', deptSchema);
