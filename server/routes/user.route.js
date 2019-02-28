const Users = require('../controllers/user.controller');
const verifyUser = require('../middlewares/authAccess');
const usersMiddleware = require('../middlewares/validateUser');
const {
  authenticate
} = require('../middlewares/authenticate');

module.exports = app => {
  app.get('/api/v1/users', authenticate, Users.getAll);
  app.post('/api/v1/users', usersMiddleware.validateUser, Users.createUser);
  app.post('/api/v1/login', Users.login);
  app.get('/api/v1/users/me', authenticate, Users.findMe);
  app.delete('/api/v1/users/me/token', authenticate, Users.logout);
  app.post('/api/v1/users/authenticate', Users.authenticateUser);
  app.get('/api/v1/users/:id', Users.get);
};
