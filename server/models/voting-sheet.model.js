const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votingSheetSchema = new Schema({
  voter: {
    type: String
  },
  candidate: {
    type: String,
    ref: 'Candidate'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('VotingSheet', votingSheetSchema);
