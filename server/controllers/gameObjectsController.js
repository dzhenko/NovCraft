'use strict';

var GameObjects = require('mongoose').model('GameObjects'),
    objectsHandler = require('../handlers/userObjectsHandler');

module.exports = {
    getGameObjectsForUserId: function(req, res, next) {
        GameObjects.findOne({owner: req.params.owner}).exec(function(err, userGameObjects) {
            if (err) {
                console.log('Game objects could not be loaded ' + err);
            }

            if (!userGameObjects) {
                console.log('Un-existing user required his game objects');
                res.status(404);
                res.end();
            }

            // in sync
            objectsHandler.refreshUserGameObjects(userGameObjects);

            userGameObjects.save(function(){
                res.send(userGameObjects);
            });
        })
    }
};