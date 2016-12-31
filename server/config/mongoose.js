var mongoose = require('mongoose');

module.exports = function(config) {
    
    var userModel = require('../../server/models/Users');
    var courseModel = require('../../server/models/Courses');
    
    // connect to MongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoUrl);

    // create default admin user
    userModel.createDefaultAdminUsers();

    // create default Courses
    courseModel.createDefaultCourses();
}