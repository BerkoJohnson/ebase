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
  app.post(`${URL}/multiple`, upload.single('file'), Voters.addMultipleVoters);
  app.post(URL, Voters.addVoter);
  //app.post(URL/multiple, Voters.addMultipleVoters); // Add class-based voters

  app.get(URL, Voters.getall);
  app.patch(`${URL}/:room`, Voters.generateVoters);
  app.put(`${URL}/:id/vote`, Voters.vote);
}
