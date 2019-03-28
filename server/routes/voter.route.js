const Voters = require('../controllers/voter.controller');
const multer = require('multer');

const verifyUser = require('../middlewares/authAccess');
const {
  authenticate
} = require('../middlewares/authenticate');

const upload = multer({
  dest: 'uploads/csv-files/'
})


const URL = '/api/v1/voters';

module.exports = app => {
  app.post(`${URL}/login`, Voters.login);
  app.put(`${URL}/:id/vote`, Voters.vote);
  app.get(`${URL}/imported-classes`, Voters.getImportedClasses);
  app.get(URL, Voters.getall);
  app.get(`${URL}/:room`, Voters.votersPerClass);
  app.patch(`${URL}/generate-voters`, Voters.generateVoters);
  app.patch(`${URL}/generate-pins`, Voters.generatePins);
}
