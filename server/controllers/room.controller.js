const Room = require('../models').Room;
const Department = require('../models').Department;

const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

module.exports = {
  async getall(req, res) {
    try {
      const rooms = await Room.find().select('_id title dept').populate('dept', 'title _id').exec();
      res.status(200).json(rooms);
    } catch (e) {
        res.status(400).json(e);
    }
  },
  async get(req, res) {
    try {
      const id = req.params.id;
      const room = await Room.findById(id).select('_id title dept').populate('dept', 'title _id').exec();
      res.status(200).json(room);
    } catch (e) {
        res.status(400).json(e);
    }
  },
  async add(req, res) {
    try {
      const { title, dept } = req.body;
      const room = new Room({ title, dept });
      const roomSaved = await room.save();
      if(roomSaved) {
        await Department.findByIdAndUpdate(dept, {$push: {rooms: roomSaved._id}}).exec();
      }
      res.status(200).send('Room added');
    } catch (e) {
        res.status(400).json(e);
    }
  },
  async remove(req, res) {
    try {
      const id = req.params.id;
      const roomDeleted = await Room.findByIdAndDelete(id).exec();
      if(roomDeleted) {
        await Department.findByIdAndUpdate(dept, {$pull: {rooms: roomDeleted._id}}).exec();
      }
      res.status(200).send('Room removed');
    } catch (e) {
        res.status(400).json(e);
    }
  },
}
