'use strict';

var encryption = require('../utilities/encryption'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Resource = mongoose.model('Resource');

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        newUserData.roles = []; // no cheats
        newUserData.password = undefined; // no cheats
        User.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user ' + err);
                return;
            }

            Resource.generateUserResources(user, function(err, resource) {
                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()})
                    }

                    res.send(user);
                });
            });
        })
    },
    updateUser: function (req, res, next) {
        if (req.user._id.toString() === req.body._id.toString() || req.user.roles.indexOf('admin') >= 0) {
            var newUserData = req.body;
            if (newUserData.password && newUserData.password.length > 5) {
                newUserData.salt = encryption.generateSalt();
                newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                newUserData.password = undefined;
            }

            User.update({_id: newUserData._id}, newUserData, function () {
                res.end();
            })
        }
        else {
            req.send({reason: "You do not have permissions"});
        }
    },
    getAllUsers: function (req, res) {
        User.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Users could not be loaded ' + err);
            }

            res.send(collection);
        });
    }
};