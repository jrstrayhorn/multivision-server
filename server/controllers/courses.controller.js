var mongoose = require('mongoose');
var Course = mongoose.model('Course');

exports.getCourses = function(req, res, next){
  Course.find(function(err, courses){
    if(err) { return next(err); }

    res.json(courses);
  });
};

exports.getCourseById = function(req, res, next){
  Course.findById(req.params._id).exec(function(err, course) {
    if (err) { return next(err); }
    if (!course) { return next(new Error("can't find course")); }

    res.json(course);
  });
};