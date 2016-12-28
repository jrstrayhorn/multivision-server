var mongoose = require('mongoose');

module.exports = function(config) {
    // connect to MongoDB
    require('../../server/models/Users');
    
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
}