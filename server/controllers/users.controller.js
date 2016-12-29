var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getUsers = function(req, res, next){
  User.find(function(err, users){
    if(err) { return next(err); }

    res.json(users);
  });
};

exports.updateUser = function(req, res, next){
    if(!req.body.username || !req.body.firstname || !req.body.lastname){
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var userUpdates = {};

    userUpdates.username = req.body.username;
    userUpdates.firstname = req.body.firstname;
    userUpdates.lastname = req.body.lastname;
    if (req.body.password && req.body.password.length > 0) {
        var user = new User();
        user.setPassword(req.body.password);
        userUpdates.salt = user.salt;
        userUpdates.hash = user.hash;
    }

    User.findByIdAndUpdate(req.payload._id, {
        $set: userUpdates
    }, function (err, user) {
        if (err) return res.status(400).json({message: err.toString()});
        return res.json({token: user.generateJWT()});
    });
};

exports.createUser = function(req, res, next){
    if(!req.body.email || !req.body.password || !req.body.fname || !req.body.lname){
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();
    
    user.username = req.body.email.toLowerCase();
    user.setPassword(req.body.password);
    user.firstname = req.body.fname;
    user.lastname = req.body.lname;

    user.save(function(err){
        if(err) { 
            //return next(err); 
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            return res.status(400).json({message: err.toString()});
        }

        return res.json({token: user.generateJWT()});
    });

};