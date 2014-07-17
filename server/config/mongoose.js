'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        hashPass: String,
        roles: [String]
    });

    userSchema.method({
        authenticate: function(password) {
            return (generateHashedPassword(this.salt, password) === this.hashPass);
        }
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if (err) {
            console.log('Can not find users ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt,
                hashedPwd;

            salt = generateSalt();
            hashedPwd = generateHashedPassword(salt, 'name1');
            User.create({username: 'name1', firstName:'user1FirstName', lastName: 'user1LastName', salt:salt, hashPass: hashedPwd, roles:['admin']});

            salt = generateSalt();
            hashedPwd = generateHashedPassword(salt, 'name2');
            User.create({username: 'name2', firstName:'user2FirstName', lastName: 'user2LastName', salt:salt, hashPass: hashedPwd, roles:['standard']});

            salt = generateSalt();
            hashedPwd = generateHashedPassword(salt, 'name3');
            User.create({username: 'name3', firstName:'user3FirstName', lastName: 'user3LastName', salt:salt, hashPass: hashedPwd});

            console.log('Users collection was empty - added 4 test users');
        }
    });
};

function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}