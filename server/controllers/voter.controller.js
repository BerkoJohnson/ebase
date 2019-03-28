const Candidate = require('../models').Candidate;
const Voter = require('../models').Voter;
const VotingSheet = require('../models').VotingSheet;
const Student = require('../models').Student;
const GenerateVoter = require('../models').GenerateVoter;

const csv = require('csv-parser');
const papaParse = require('papaparse');
const path = require('path');
const fs = require('fs');
const securePin = require('secure-pin');


module.exports = {
  async getall(req, res) {
    try {
      const voters = await Voter.find().exec();
      res.status(200).json(voters);
    } catch (e) {
        res.status(400).json(e);
    }
  },

  async vote(req, res) {
    try {
      const id = req.params.id;
      const checkedVoter = await Voter.findById(id).exec();

      if(checkedVoter.loggedIn && checkedVoter.voted) {
        return res.send({mess: 'You cannot vote again. It\'s not allowed.'})
      }

      const voteDataSaved = [];
      for (voteData of req.body) {
        const {candidate, position, voted} = voteData;
        // // console.log(JSON.stringify(req.body, undefined, 2));
        // console.log(candidate._id,voted);

        if(position.votingType === 'ThumbsUp' ) {
          await Candidate.findByIdAndUpdate(candidate._id, {$inc: {"votes.thumbsUp": 1}}).exec();
        }
        else if(position.votingType === 'Yes/No' && voted ==='Yes') {
          await Candidate.findByIdAndUpdate(candidate._id, {$inc: {"votes.Yes": 1}}).exec();
        }
        else if(position.votingType === 'Yes/No' && voted ==='No') {
          await Candidate.findByIdAndUpdate(candidate._id, {$inc: {"votes.No": 1}}).exec();
        }
        voteDataSaved.push([candidate._id]);
      }

        const voter = await Voter.findByIdAndUpdate(id, {voted: true}, {new: true})
      if(voteDataSaved === req.body.length && voter) {
        res.send({mes: 'Vote successfull'})
      }

    } catch(e) {
        res.status(400).json(e);
    }
  },

  async generateVoters(req, res) {
    try {
      const room = req.body.room;
      const genTable = await GenerateVoter.findOne({room}).exec();

      if (genTable !== null) {
        return res.status(400).send('Already generated for this class');
      }

      const students = await Student.find().where({room: room}).exec();
      let savedVoters = [];

      for (student of students) {
        let pin = securePin.generatePinSync(4);
        let voter = new Voter({student: student._id, pin: pin, room: room});
        await voter.save();

        savedVoters.push(student._id);
      }

      if(students.length === savedVoters.length) {
        const voters = await Voter.find().where({room: room}).select('student _id pin room').populate('room', 'title').populate('student', 'name').exec();

        const genTable = new GenerateVoter({room});
        await genTable.save();

        return res.json(voters);
      }

      res.json(students);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  async getImportedClasses(req, res) {
    try {
      const rooms = await GenerateVoter.find().select('room').populate('room', 'title').exec();
      res.json(rooms);

    } catch (e) {
      res.status(400).json(e);
    }
  },
  async votersPerClass(req, res) {
    try {
      const room = req.params.room;
      const voters = await Voter.find().where({room: room}).select('student _id pin room').populate('room', 'title').populate('student', 'name').exec();

      res.json(voters);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  async login(req, res) {
    try {
      const {pin} = req.body;
      const voterExists = await Voter.findOne({pin}).exec();
      const voterVoted = await Voter.findOne({pin: pin, voted: true}).exec();

      if(!voterExists) {return res.status(400).json({message: 'You are not a registered voter!!'});}
      if(voterVoted) {return res.status(400).json({message: 'You have already voted!!'});}

      const voter = await Voter.findOneAndUpdate({pin}, {loggedIn: true}, {new: true}).exec();

      res.json({voter});

    } catch (e) {
      res.status(400).json(e);
    }
  },
  async generatePins(req, res) {
    try {
      const students = await Student.find().exec();
      let savedVoters = [];

      for (student of students) {
        let pin = securePin.generatePinSync(4);
        let voter = new Voter({student: student._id, pin: pin, name: student.name});
        await voter.save();

        savedVoters.push(student._id);
      }

      if(students.length === savedVoters.length) {
        const voters = await Voter.find().select('student _id pin').populate('student', 'name').exec();

        return res.json(voters);
      }

      res.json(students);
    } catch (e) {
      res.status(400).json(e);
    }
  },
}
