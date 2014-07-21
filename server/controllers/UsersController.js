'use strict';

var encryption = require('../utilities/encryption'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    GameObjects = mongoose.model('GameObjects'),
    initialObjects = require('../game/initialUserObjects');

function getUnusedCoordinatesForUser(otherUsers) {
    var invalidCoords = true;

    while (invalidCoords) {
        invalidCoords = false;
        var randomCoords = [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)];

        for (var i = 0; i < otherUsers.length; i++) {
            if (otherUsers[i].coordinates[0] === randomCoords[0] &&
                otherUsers[i].coordinates[1] === randomCoords[1] &&
                otherUsers[i].coordinates[2] === randomCoords[2]) {
                randomCoords = [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)];
                invalidCoords = true;
                break;
            }
        }
    }

    return randomCoords;
}

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        newUserData.roles = []; // no cheats
        newUserData.password = undefined; // no cheats

        User.find({}).exec(function(err, allUsers) {
            if (err) {
                console.log('Failed to find all users to get their coordinates' + err);
                return;
            }

            newUserData.coordinates = getUnusedCoordinatesForUser(allUsers);

            User.create(newUserData, function (err, user) {
                if (err) {
                    console.log('Failed to register new user ' + err);
                    return;
                }

                initialObjects.createDefaultsForUser(user);

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()})
                    }

                    res.send(user);
                });
            })
        });
    },
    updateUser: function (req, res, next) {
        if (req.user._id.toString() === req.body._id.toString() || req.user.roles.indexOf('admin') >= 0) {
            var newUserData = req.body;
            newUserData.roles = []; // no cheats
            newUserData.password = undefined; // no cheats
            if (newUserData.password && newUserData.password.length > 5) {
                newUserData.salt = encryption.generateSalt();
                newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                newUserData.password = undefined;
            }

            // check if user changes coordinates
            User.find({_id: newUserData._id}).exec(function(err, foundUser) {
                if (err) {
                    console.log('Users could not be loaded ' + err);
                }

                newUserData.coordinates = foundUser.coordinates;

                User.update({_id: newUserData._id}, newUserData, function () {
                    res.end();
                })
            });
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