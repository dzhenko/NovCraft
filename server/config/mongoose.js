'use strict';

var mongoose = require('mongoose'),
    modelsExports = require('../models'),
    attack = require('../handlers/attacksHandler');

module.exports = function (config) {
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

    // TODO: Add admins manually
    // showDb();

    attack.handleAttack(
        {
            ships: [13, 44, 13, 5],
            airUpgrades: [3,4,5]
        },
        {
            troops: [17, 22, 8],
            groundUpgrades: [4, 5, 7],
            ships: [5, 14, 3, 1],
            airUpgrades: [5, 5 , 5]
        },
        10
    )
};

// TODO: Remove after development
function clearDb() {
    // TODO: Remove courses
    // modelsExports.courses.removeAll();
    modelsExports.user.removeAll();
    modelsExports.gameObjects.removeAll();
}

// TODO: Remove after development
function showDb() {
    modelsExports.gameObjects.showAll();
    modelsExports.user.showAll();
}