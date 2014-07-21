'use strict';

var userInitialObjects = require('../game/initialUserObjects'),
    buildingsModel = require('../game/buildingsModel');

module.exports = {
    initialObjects: userInitialObjects,
    buildings: buildingsModel
};