const Candidate = require('../models/candidate.model');
const Position = require('../models/position.model');


module.exports = {
  async getall(req, res) {
    try {
      const candidates = await Candidate.find().populate('position', 'title').select('name _id votes position').exec();
      res.status(200).json(candidates);
    } catch (e) {
        res.status(401).json(e);
    }
  },
  async addCandidate(req, res) {
    try {
      const {name, position} = req.body;
      const newNandidate = new Candidate({name, position});
      const candidate = await newNandidate.save();

      if(candidate) {
        await Position.findByIdAndUpdate(position, {$push: {candidates: candidate._id}}).exec();
      }
      res.status(200).send({message: 'Candidate saved.'});
    } catch (e) {
        res.status(401).json(e);
    }
  },
  async removeCandidate(req, res) {
    try {
      const id = req.params.id;
      const candidate = await Candidate.findByIdAndDelete(id);
      if(candidate) {
        await Position.findByIdAndUpdate(candidate.position, {$pull: {candidates: candidate._id}}).exec();
      }
      res.status(200).send({message: 'Candidate removed'});
    } catch(e) {
        res.status(401).json(e);
    }
  },
  async getCandidate(req, res) {
    try {
      const id = req.params.id;
      const candidate = await Candidate.findById(id).populate('position', 'title').select('name _id votes position').exec();
      res.status(200).json(candidate);
    } catch(e) {
        res.status(401).json(e);
    }
  }
}
