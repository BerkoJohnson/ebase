const Student = require('../models').Student;

const csv = require('csv-parser');
const papaParse = require('papaparse');
const path = require('path');
const fs = require('fs');

module.exports = {
  async add(req, res) {
    try {
      const {
        name
      } = req.body;
      const student = new Student({
        name
      });
      await student.save();
      res.status(200).send('student added');
    } catch (e) {
      res.status(400).json(e);
    }

  },
  async addMultiple(req, res) {
    try {
      const {room}= req.body;
      const ext = path.extname(req.file.originalname);
      const oldPath = `./${req.file.path}`;
      const newPath = `./${oldPath}${ext}`;

      const results =[];
      let savedToDb = [];
      fs.rename(oldPath, newPath, (err) => {
        if(err) {
          return;
        }
      });

      setTimeout(() => {
        fs.createReadStream(newPath).pipe(csv())
          .on('data', (data) => {
            results.push({no: data.NO, name: data.NAME});
          })
          .on('end', () => {
            for (let i=0; i<results.length; i++) {
              const student = new Student({
                name: results[i].name,
                room: room
              });
              student.save().then(doc => {
                savedToDb.push(doc._id);
              });
            }
          });

      }, 1000);

      setTimeout(() => {
        Student.find()
          .where({room: room})
          .select('yearOfAdmission name _id')
          .exec()
          .then(docs => {
            res.status(200).json(docs);
          });
      }, 2000);
    } catch(error) {
      res.status(400).json(error);
    }
  },
  async getall(req, res) {
    try {
      const students = await Student.find().select('name room _id').populate('room', 'title').exec();
      res.status(200).json(students);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  async get(req, res) {
    try {
      const {
        id
      } = req.body;
      const students = await Student.finById(id).exec();
      res.status(200).json(students);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
