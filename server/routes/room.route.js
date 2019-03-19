const Rooms = require('../controllers/room.controller');
const multer = require('multer');

const verifyUser = require('../middlewares/authAccess');
const {
  authenticate
} = require('../middlewares/authenticate');

const upload = multer({
  dest: 'uploads/csv-files/'
})


const URL = '/api/v1/rooms';

module.exports = app => {
  app.post(URL, Rooms.add);
  app.get(URL, Rooms.getall);
  app.get(`${URL}/:id`, Rooms.get);
}
