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
  async addMultipleVoters(req, res) {
    try {

      const ext = path.extname(req.file.originalname);
      const oldPath = `./${req.file.path}`;
      const newPath = `./${oldPath}${ext}`;

      const results =[];

      fs.rename(oldPath, newPath, (err) => {
        if(err) {
          return;
        }
      });

      fs.createReadStream(newPath).pipe(csv())
        .on('data', (data) => {
          results.push({no: data.NO, name: data.NAME});
        })
        .on('end', () => {
          res.json(results);
        })


    } catch(e) {
      res.status(400).json({e, i: 'Inside addMultipleVoters'});
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
        res.status(400).json({e, i: 'Inside vote'});
    }
  },
  async generateVoters(req, res) {
    try {
      const room = req.params.room;
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
  }
}
