var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var jwtPerm = require('express-jwt-permissions');
var auth = require('../../server/config/auth');

var config = require('../../server/config/server-config');

var users = require('../../server/controllers/users.controller');

// middleware for authenticating jwt tokens
var authJWT = jwt({secret: config.secretKey, userProperty: 'payload'});

// middleware for checking permissions of jwt token
var guard = jwtPerm({requestProperty: 'payload', permissionsProperty: 'roles'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users */
router.get('/api/users', authJWT, guard.check('admin'), users.getUsers);

/* POST register */
router.post('/register', users.createUser);

/* POST updateuser */
router.put('/api/users', authJWT, users.updateUser);

/* POST login */
router.post('/login', auth.authenticate);

module.exports = router;
