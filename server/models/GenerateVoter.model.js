const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }
});

module.exports = mongoose.model('GenerateVoter', schema);
