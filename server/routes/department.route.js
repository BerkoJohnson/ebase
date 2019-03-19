const Departments = require('../controllers/department.controller');
const multer = require('multer');

const verifyUser = require('../middlewares/authAccess');
const {
  authenticate
} = require('../middlewares/authenticate');

const upload = multer({
  dest: 'uploads/csv-files/'
})


const URL = '/api/v1/depts';

module.exports = app => {
  app.post(URL, Departments.add);
  app.get(URL, Departments.getall);
  app.get(`${URL}/:id`, Departments.get);
}
