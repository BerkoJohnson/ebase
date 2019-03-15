const Candidates = require('../controllers/candidate.controller');
const multer = require('multer');

const verifyUser = require('../middlewares/authAccess');
const {
  authenticate
} = require('../middlewares/authenticate');

const upload = multer({
  dest: 'server/dist/ebase/assets/candidates'
})

const URL = '/api/v1/candidates';

module.exports = app => {
  app.get(URL, Candidates.getall);
  app.post(URL, Candidates.addCandidate);
  app.put(`${URL}/upload-photo`, upload.single('image'), Candidates.uploadPhoto);
  app.get(`${URL}/:id`, Candidates.getCandidate);
  app.delete(`${URL}/:id`, Candidates.removeCandidate);
}
