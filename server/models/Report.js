'use strict';
var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    time: new Date(),
    target: {
        ships: [],
        troops: [],
        damage: []
    },
    attacker: {
        ships: [],
        damage: []
    }
});

var Report = mongoose.model('Report', reportSchema);