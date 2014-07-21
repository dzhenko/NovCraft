'use strict';

var userInitialObjects = require('../game/initialUserObjects'),
    buildingsModel = require('../game/buildingsModel'),
    upgradesModel = require('../game/upgradesModel'),
    unitsModel = require('../game/unitsModel');

module.exports = {
    initialObjects: userInitialObjects,
    buildings: buildingsModel,
    upgrades: upgradesModel,
    units: unitsModel
};