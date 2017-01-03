var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var jwtPerm = require('express-jwt-permissions');
var auth = require('../../server/config/auth');

var config = require('../../server/config/server-config');

var users = require('../../server/controllers/users.controller');
var courses = require('../../server/controllers/courses.controller');

// middleware for authenticating jwt tokens
var authJWT = jwt({secret: config.secretKey, userProperty: 'payload'});

// middleware for checking permissions of jwt token
var guard = jwtPerm({requestProperty: 'payload', permissionsProperty: 'roles'});

/* users routes */
router.get('/api/users', authJWT, guard.check('admin'), users.getUsers);
router.put('/api/users', authJWT, users.updateUser);

/* courses routes */
router.get('/api/courses', courses.getCourses);
router.get('/api/courses/:_id', courses.getCourseById);

/* authentication routes */
router.post('/register', users.createUser);
router.post('/login', auth.authenticate);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
