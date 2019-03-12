const Positions = require('../controllers/position.controller');
const verifyUser = require('../middlewares/authAccess');
const {
  authenticate
} = require('../middlewares/authenticate');

const URL = '/api/v1/positions';

module.exports = (app) => {
  app.get(URL, Positions.getall);
  app.post(URL, Positions.addPosition);
  app.get(`${URL}/:id`, Positions.get);
  app.delete(`${URL}/:id`, Positions.deletePosition);
}
