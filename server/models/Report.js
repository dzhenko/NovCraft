'use strict';
var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    time: Date,
    win: Boolean,
    enemy : [Number],
    enemyID : { type: mongoose.Schema.ObjectId, ref: 'User' },
    stolen: [Number],
    attacker: {
        ships: [],
        damage: []
    },
    defender: {
        ships: [],
        troops: [],
        damage: []
    }
});

var Report = mongoose.model('Report', reportSchema);

// For development
module.exports = {
    removeAll: function () {
        Report.remove({}).exec(function (err) {
            if (err) {
                console.log('Can not delete Reports ' + err);
            }
            else {
                console.log('All Reports deleted successfully');
            }
        })
    },
    showAll: function () {
        Report.find({}).exec(function (err, objects) {
            if (err) {
                console.log('Can not get game objects resources ' + err);
            }
            else {
                console.log('----------------------------------------');
                console.log('All Reports :');
                console.log(objects);
            }
        })
    }
};
