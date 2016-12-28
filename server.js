var express = require('express');
var passport = require('passport');

var config = require('./server/config/server-config');

//setup mongo/mongoose
require('./server/config/mongoose')(config);

var app = express();

// setup express
require('./server/config/express')(app);

// initialize passport
app.use(passport.initialize());

// setup routes
require('./server/config/routes')(app);

// setup error handlers
require('./server/config/error-handler')(app);

module.exports = app;
