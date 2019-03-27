const Candidate = require('../models').Candidate;
const Position = require('../models').Position;

module.exports = {
  async getall(req, res) {
    try {
      const positions = await Position.find().populate({path:'candidates', select:'name photoPath'}).exec();
      res.json(positions);
    } catch (e) {
      res.status(400).json(e);
    }
  },

  async addPosition(req, res) {
    try {
      const {title, votingType} = req.body;
      const position = new Position({title, votingType});
      await position.save();
      res.status(200).send({message: 'Position saved'});
    } catch(e) {
        res.status(400).json(e);
    }
  },

  async deletePosition(req, res) {
    try {
      const id = req.params.id;
      const position = await Position.findByIdAndDelete(id).exec();

      if(position  && position.candidates) {
        for (var i = 0; i < position.candidates.length; i++) {
          await Candidate.findByIdAndUpdate(position.candidates[i], {position: null}).exec();
        }
      }

      res.status(200).send({message: 'Position removed'});
    } catch(e) {
      res.status(400).json(e);
    }
  },
  async get(req, res) {
    try {
      const id = req.params.id;
      const position = await Position.findById(id).exec();
      res.status(200).json(position);
    } catch(e) {
      res.status(400).json(e);
    }
  }
}
