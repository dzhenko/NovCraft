'use strict';

var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function(password) {
        return (encryption.generateHashedPassword(this.salt, password) === this.hashPass);
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection){
        if (err) {
            console.log('Can not find users ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt,
                hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'name1');
            User.create({username: 'name1', firstName:'user1FirstName', lastName: 'user1LastName', salt:salt, hashPass: hashedPwd, roles:['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'name2');
            User.create({username: 'name2', firstName:'user2FirstName', lastName: 'user2LastName', salt:salt, hashPass: hashedPwd, roles:['standard']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'name3');
            User.create({username: 'name3', firstName:'user3FirstName', lastName: 'user3LastName', salt:salt, hashPass: hashedPwd});

            console.log('Users collection was empty - added 4 test users');
        }
    });
};