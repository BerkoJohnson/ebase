const Department = require('../models').Department;

const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

module.exports = {
  async getall(req, res) {
    try {
      const depts = await Department.find().exec();
      res.status(200).json(depts);
    } catch (e) {
        res.status(400).json(e);
    }
  },
  async get(req, res) {
    try {
      const {id} = req.body;
      const dept = await Department.findById(id).exec();
      res.status(200).json(dept);
    } catch (e) {
        res.status(400).json(e);
    }
  },
  async add(req, res) {
    try {
      const {title} = req.body;
      const dept = new Department({title});
      await dept.save();
      res.status(200).send('Department added');
    } catch (e) {
        res.status(400).json(e);
    }
  },
}
