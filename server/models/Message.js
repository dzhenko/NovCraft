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

module.exports = {
    removeAll: function () { // TODO: Remove after development
        Message.remove({}).exec(function (err) {
            if (err) {
                console.log('Can not delete game objects ' + err);
            }
            else {
                console.log('All Messages deleted successfully');
            }
        })
    },
    showAll: function () { // TODO: Remove after development
        Message.find({}).exec(function (err, objects) {
            if (err) {
                console.log('Can not get Messages ' + err);
            }

            else {
                console.log('----------------------------------------');
                console.log('All Messages :');
                console.log(objects);
            }
        })
    }
};
