const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  dept: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);
