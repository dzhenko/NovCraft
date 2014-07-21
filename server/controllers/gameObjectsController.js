'use strict';

var GameObjects = require('mongoose').model('GameObjects'),
    objectsHandler = require('../handlers/userObjectsHandler');

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

            objectsHandler.refreshUserGameObjects(userGameObjects);

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
//        type: String, (buildings / ships / troops / upgrades
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
    // player ID
//    target: Number,
        // time of hit
//        time: Number,
    // attacker's transport tier1 tier2 tier3 ships
//      ships: [Number]
// turns: Number
//  }
//  ],
//  returns: [
//      {
//          // time of land home
//          time: Number,
//          // attacker's transport tier1 tier2 tier3 ships
//          ships: [Number],
//          // outcome of the battle may result in resources for the attacker
//          cargo: [Number]
//          // show the outcome
//          report: {}
//      }
//  ],
//      defences: [
//      {
//          // player ID
//          source: Number,
//          // time of attack home
//          time: Number
//      }
//  ]
//]