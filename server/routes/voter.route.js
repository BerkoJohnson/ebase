const Voters = require('../controllers/voter.controller');

const verifyUser = require('../middlewares/authAccess');
const {
  authenticate
} = require('../middlewares/authenticate');

const URL = '/api/v1/voters';

module.exports = app => {
    app.post(URL, Voters.addVoter);
    //app.post(URL/multiple, Voters.addMultipleVoters); // Add class-based voters

    app.get(URL, Voters.getall);
    app.put(`${URL}/:id/vote`, Voters.vote);
}
