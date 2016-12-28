var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('express-jwt');
var jwtPerm = require('express-jwt-permissions');

var config = require('../../server/config/server-config');

// middleware for authenticating jwt tokens
var authJWT = jwt({secret: config.secretKey, userProperty: 'payload'});

// middleware for checking permissions of jwt token
var guard = jwtPerm({requestProperty: 'payload', permissionsProperty: 'roles'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users */
router.get('/api/users', authJWT, guard.check('admin'), function(req, res, next){
  User.find(function(err, users){
    if(err) { return next(err); }

    res.json(users);
  });
});

/* POST login */
router.post('/login', function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
