const Students = require('../controllers/student.controller');
const multer = require('multer');

const verifyUser = require('../middlewares/authAccess');
const {
  authenticate
} = require('../middlewares/authenticate');

const upload = multer({
  dest: 'uploads/csv-files/'
})


const URL = '/api/v1/students';

module.exports = app => {
  app.post(`${URL}/multiple`, upload.single('file'), Students.addMultiple);
  app.post(URL, Students.add);
  app.get(URL, Students.getall);
}
