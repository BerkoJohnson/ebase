const Voter = require('../models/voter.model');
const Candidate = require('../models/candidate.model');
const VotingSheet = require('../models/voting-sheet.model');

module.exports = {
  async getall(req, res) {
    try {
      const voters = await Voter.find().exec();
      res.status(200).json(voters);
    } catch (e) {
        res.status(400).json(e);
    }
  },
  async addVoter(req, res) {
    try {
      const {name} = req.body;
      const voter = new Voter({name});
      await voter.save();
      res.status(200).send('Voter added');
    } catch (e) {
        res.status(400).json(e);
    }
  },
  async vote(req, res) {
    try {
      const id = req.params.id;
      const {candidate} = req.body;

      const ifVotedAlready = await VotingSheet.findOne({voter: id}).exec();

      if(ifVotedAlready) {
        return res.status(401).send('Has voted already');
      }
      const votedForCandidate = await Candidate.findByIdAndUpdate(candidate, {$inc: {votes: 1}}, {new: true}).exec();

      if(candidate) {
        const sheet = new VotingSheet({voter: id, candidate: votedForCandidate._id});
        await sheet.save();
      }
      res.status(200).send('Voter voted');
    } catch(e) {
        res.status(400).json(e);
    }
  }
}
