'use strict';

var GameObjects = require('mongoose').model('GameObjects'),
    buildingsModel = require('../game/buildingsModel');

module.exports = {
    getGameObjectsForUserId: function(req, res, next) {
        GameObjects.findOne({owner: req.params.owner}).exec(function(err, userGameObjects) {
            if (err) {
                console.log('Game objects could not be loaded ' + err);
            }

            if (!userGameObjects) {
                console.log('Un-existing user required his game objects');
                res.status(404);
                res.end();
            }

            // updating
            var newUpdated = (new Date()).getTime();
            var diffMs = newUpdated - userGameObjects.updated;
            userGameObjects.updated = newUpdated;

            // resources
            userGameObjects.minerals+= Math.round((diffMs / 60000) * buildingsModel.mineralFactory.amount[userGameObjects.buildings[0]]);
            userGameObjects.gas+=  Math.round((diffMs / 60000) * buildingsModel.gasFactory.amount[userGameObjects.buildings[1]]);

            userGameObjects.save(function(){
                res.send(userGameObjects);
            });
        })
    }
};

//    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
//    minerals: Number,
//    gas: Number,
//    updated: Number,
//    tasks: [
//    {
//        finishTime: Number,
//        type: String,
//        indexToAddTo: Number
//    }
//],
//    // mineral gas energy supply barracks ships lab - only indexes
//    buildings: [0, 0, 0, 0, 0, 0, 0],
//    // transport tier 1 tier 2 tier 3
//    ships: [0, 0, 0, 0],
//    // tier 1 tier 2 tier 3
//    troops: [0, 0, 0],

//    upgrades: [0,0,0,0,0,0,0],
//    attacks: [
//    {
//        // player ID
//        source: Number,
//        // player ID
//        target: Number,
//        // time of take off
//        start: Number,
//        // time of land home (half time is time of HIT
//        finish: Number,
//        // attacker's transport tier1 tier2 tier3 ships
//        attacker: [Number]
//    }
//]