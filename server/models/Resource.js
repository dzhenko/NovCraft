'use strict';

var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema({
    owner : { type: mongoose.Schema.ObjectId, ref: 'User' },
    growRate: [Number],
    updated: Date,
    minerals: Number,
    gas: Number,
    energy: Number,
    supply: Number
});

resourceSchema.statics.generateUserResources = function(user, callback) {
    Resource.create({
        owner: user,
        growRate: [1,1],
        updated: new Date(),
        minerals: 250,
        gas: 0,
        energy: 15,
        supply: 10
    }, function(err, resource) {
        if (callback) {
            callback(err, resource);
        }
        else {
            console.log(err);
        }
    });
};

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = {
    removeAll: function() {
        Resource.remove({}).exec(function(err){
            if (err) {
                console.log('Can not delete resources ' + err);
            }
            else {
                console.log('All Resources deleted successfully');
            }
        })
    }
};
