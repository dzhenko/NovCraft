'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    GameObjects = mongoose.model('GameObjects');

module.exports = {
    createDefaultsForUser: function (user) {
        GameObjects.create({
            owner: user,
            minerals: 250,
            gas: 0,
            updated: (new Date()).getTime(),
            tasks: [],
            // mineral gas energy supply troops ships lab - only indexes
            buildings: [0, 0, 0, 0, 0, 0, 0],
            // transport tier 1 tier 2 tier 3
            ships: [0, 0, 0, 0],
            // tier 1 tier 2 tier 3
            troops: [0, 0, 0],
            // TODO: this
            upgrades: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            attacks: []
        });
    }
};