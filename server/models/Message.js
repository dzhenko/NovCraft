'use strict';
var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    from: String,
    date: Date,
    text: Number,
    attachments: {}
});

var Message = mongoose.model('Message', messageSchema);