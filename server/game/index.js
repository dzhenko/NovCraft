'use strict';

var userInitialObjects = require('../game/initialUserObjects'),
    buildingsModel = require('../game/buildingsModel'),
    terranModel = require('../game/terranModel'),
    protossModel = require('../game/protossModel'),
    zergModel = require('../game/zergModel');

module.exports = {
    defaults: userInitialObjects,
    buildings: buildingsModel,
    terran: terranModel,
    protoss: protossModel,
    zerg: zergModel
};