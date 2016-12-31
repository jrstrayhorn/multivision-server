var mongoose = require('mongoose');
var Course = mongoose.model('Course');

exports.getCourses = function(req, res, next){
  Course.find(function(err, courses){
    if(err) { return next(err); }

    res.json(courses);
  });
};