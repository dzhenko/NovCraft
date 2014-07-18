'use strict';

var encryption = require('../utilities/encryption'),
    User = require('mongoose').model('User');

module.exports = {
    createUser: function(req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function(err, user) {
            if (err) {
                console.log('Failed to register new user ' + err);
                return;
            }

            req.logIn(user, function(err){
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()})
                }

                res.send(user);
            });
        })
    },
    getAllUsers: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded ' + err);
            }

            res.send(collection);
        });
    }
};