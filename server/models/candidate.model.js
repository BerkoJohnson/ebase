const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  position: {
    type:  Schema.Types.ObjectId,
    ref: 'Position'
  },
  votes: {
    thumbsUp: {
      type: Number,
      default: 0
    },
    Yes: {
      type: Number,
      default: 0
    },
    No: {
      type: Number,
      default: 0
    }
  },
  photoPath: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Candidate', candidateSchema);
