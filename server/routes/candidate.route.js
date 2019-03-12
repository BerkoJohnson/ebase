const Candidates = require('../controllers/candidate.controller');
const verifyUser = require('../middlewares/authAccess');
const {
  authenticate
} = require('../middlewares/authenticate');

const URL = '/api/v1/candidates';

module.exports = app => {
  app.get(URL, Candidates.getall);
  app.post(URL, Candidates.addCandidate);
  app.get(`${URL}/:id`, Candidates.getCandidate);
  app.delete(`${URL}/:id`, Candidates.removeCandidate);
}
