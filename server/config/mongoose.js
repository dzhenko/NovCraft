'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalPassport = require('passport-local');

module.exports= function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not be opened' + err);
            return;
        }

        console.log('Database up and running');
    });

    db.on('error', function (err) {
        console.log('Database error ' + err);
    });

    var userSchema = mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String,
        salt: String,
        hashPass: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if (err) {
            console.log('Can not find users ' + err);
            return;
        }

        if (collection.length === 0) {
            User.create({username: 'user1Name', firstName:'user1FirstName', lastName: 'user1LastName'});
            User.create({username: 'user2Name', firstName:'user2FirstName', lastName: 'user2LastName'});
            User.create({username: 'user3Name', firstName:'user3FirstName', lastName: 'user3LastName'});
            User.create({username: 'user4Name', firstName:'user4FirstName', lastName: 'user4LastName'});

            console.log('Users collection was empty - added 4 test users');
        }
    });

    passport.use(new LocalPassport(function(username, password, done) {
        User.findOne({ username: username }).exec(function(err, user){
            if (err) {
                console.log('Error loading user ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

    passport.serializeUser(function(user, done){
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done){
        User.findOne({_id: id}).exec(function(err, user) {
            if (err) {
                console.log('Error loading user ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    })
};