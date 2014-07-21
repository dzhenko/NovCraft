'use strict';

var mongoose = require('mongoose');

var gameObjectsSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    minerals: Number,
    gas: Number,
    updated: Number,
    tasks: [
        {
            finishTime: Number,
            type: String,
            indexToAddTo: Number
        }
    ],
    // mineral gas energy supply barracks ships lab - only indexes
    buildings: [Number],
    // transport tier 1 tier 2 tier 3
    ships: [Number],
    // tier 1 tier 2 tier 3
    troops: [Number],
    // TODO: this
    upgrades: [Number],
    attacks: [
        {
            // player ID
            source: Number,
            // player ID
            target: Number,
            // time of take off
            start: Number,
            // time of land home (half time is time of HIT
            finish: Number,
            // attacker's transport tier1 tier2 tier3 ships
            attacker: [Number]
        }
    ]
});

var GameObjects = mongoose.model('GameObjects', gameObjectsSchema);

module.exports = {
    removeAll: function () { // TODO: Remove after development
        GameObjects.remove({}).exec(function (err) {
            if (err) {
                console.log('Can not delete game objects ' + err);
            }
            else {
                console.log('All Game Objects deleted successfully');
            }
        })
    },
    showAll: function () { // TODO: Remove after development
        GameObjects.find({}).exec(function (err, objects) {
            if (err) {
                console.log('Can not get game objects resources ' + err);
            }
            else {
                console.log('----------------------------------------');
                console.log('All Game Objects :');
                console.log(objects);
            }
        })
    }
};
