'use strict';
var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    time: Date,
    win: Boolean,
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

module.exports = {
    removeAll: function () { // TODO: Remove after development
        Report.remove({}).exec(function (err) {
            if (err) {
                console.log('Can not delete Reports ' + err);
            }
            else {
                console.log('All Reports deleted successfully');
            }
        })
    },
    showAll: function () { // TODO: Remove after development
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
