'use strict';

var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema({
    owner : { type: mongoose.Schema.ObjectId, ref: 'User' },
    growRate: [Number],
    updated: Number,
    minerals: Number,
    gas: Number,
    energy: Number,
    supply: Number
});

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = {
    removeAll: function() { // TODO: Remove after development
        Resource.remove({}).exec(function(err){
            if (err) {
                console.log('Can not delete resources ' + err);
            }
            else {
                console.log('All Resources deleted successfully');
            }
        })
    },
    showAll: function() { // TODO: Remove after development
        Resource.find({}).exec(function(err, resources) {
            if (err) {
                console.log('Can not delete resources ' + err);
            }
            else {
                console.log('----------------------------------------');
                console.log('All Resources :');
                console.log(resources);
            }
        })
    }
};
