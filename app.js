var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('./server-config');

// connect to MongoDB
require('./models/Users');
require('./config/passport');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);

// create default admin user
var User = mongoose.model('User');

User.find({}).exec(function(err, collection){
  if(collection.length === 0) {
    var user = new User();

    user.firstname = config.defaultAdminFirstName;
    user.lastname = config.defaultAdminLastName;
    user.username = config.defaultAdminUser;
    user.roles = ['admin'];
    user.setPassword(config.defaultAdminPwd);
    
    user.save();

    var user1 = new User();

    user1.firstname = config.defaultUserFirstName;
    user1.lastname = config.defaultUserLastName;
    user1.username = config.defaultUser;
    user1.roles = [];
    user1.setPassword(config.defaultUserPwd);

    user1.save();
  }
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize passport
app.use(passport.initialize());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
