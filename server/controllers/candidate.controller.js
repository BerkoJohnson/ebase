// const Candidate = require('../models/candidate.model');
// const Position = require('../models/position.model');
// const Candidate = require('../models').Candidate;

const Candidate = require('../models').Candidate;
const Position = require('../models').Position;

const fs = require('fs');
const path = require('path');


module.exports = {
  async getall(req, res) {
    try {
      const candidates = await Candidate.find().populate('position', 'title').select('name _id votes photoPath position').exec();
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
      res.status(200).send({message: 'Candidate saved.', candidate});
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
      const candidate = await Candidate.findById(id).populate('position', 'title').select('name _id votes photoPath position').exec();
      res.status(200).json(candidate);
    } catch(e) {
        res.status(401).json(e);
    }
  },
  async uploadPhoto(req, res) {
    try {
      const destination = 'server/dist/ebase/assets/candidates';
      const {id} = req.body;
      const ext = path.extname(req.file.originalname);
      const oldPath = `./${req.file.path}`;
      const newPath = `./${destination}/${id}${ext}`;

      fs.rename(oldPath, newPath, (err) => {
        if(err) {
          return;
        }
      });

      await Candidate.findByIdAndUpdate(id, {photoPath: `/assets/candidates/${id}${ext}`}).exec();
      res.json({message: 'Upload complete.'});
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
