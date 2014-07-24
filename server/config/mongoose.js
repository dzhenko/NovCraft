'use strict';

var mongoose = require('mongoose'),
    modelsExports = require('../models');

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

};

// TODO: Remove after development
function clearDb() {
    // TODO: Remove courses
    // modelsExports.courses.removeAll();
    modelsExports.user.removeAll();
    modelsExports.gameObjects.removeAll();
    modelsExports.message.removeAll();
    modelsExports.report.removeAll();
}

// TODO: Remove after development
function showDb() {
    modelsExports.user.showAll();
    modelsExports.gameObjects.showAll();
    modelsExports.message.showAll();
    modelsExports.report.showAll();
}