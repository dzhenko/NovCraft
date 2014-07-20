'use strict';

var mongoose = require('mongoose'),
    modelsExports = require('../models'),
    game = require('../game');

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
    showDb();

    var a = game.buildings.getBuildingsModel();
    for (var obj in a) {
        console.log(obj);
        for (var key in a[obj]) {
            console.log(a[obj][key].length + ' ' + a[obj]);
        }
    }
};

// TODO: Remove after development
function clearDb() {
    // TODO: Remove courses
    // modelsExports.courses.removeAll();
    modelsExports.user.removeAll();
    modelsExports.resource.removeAll();
}

// TODO: Remove after development
function showDb() {
    modelsExports.resource.showAll();
    modelsExports.user.showAll();
}