const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const positionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  year: {
    type:Number,
    default: new Date().getFullYear()
  },
  candidates: [
    {
      ref: 'Candidate',
      type: Schema.Types.ObjectId
    }
  ],
  votingType: {
    type: String,
    enum: ['ThumbsUp','Yes/No'],
    default: 'ThumbsUp'
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Position', positionSchema);
