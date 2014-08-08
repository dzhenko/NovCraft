'use strict';

var GameObjects = require('mongoose').model('GameObjects'),
    userObjectsHandler = require('../handlers/userObjectsHandler'),
    userTasksHandler = require('../handlers/userTasksHandler');

module.exports = {
    // needs post with these two params req.body.taskType, req.body.taskIndexToAddTo
    createTask : function(req, res, next) {
        GameObjects.findOne({owner: req.params.owner}).exec(function(err, userGameObjects) {
            if (err) {
                console.log('Game objects could not be loaded ' + err);
            }

            if (!userGameObjects) {
                console.log('Un-existing user required his game objects');
                res.status(404);
                res.end();
            }

            // sync call
            userObjectsHandler.refreshUserGameObjects(userGameObjects);

            // sync call
            userTasksHandler.createTask(userGameObjects, req.body.taskType, req.body.taskIndexToAddTo);

            userGameObjects.save(function(){
                res.send(userGameObjects);
            });
        })
    },
    // needs put with these two params req.body.taskType, req.body.taskIndexToAddTo
    cancelTask : function(req, res, next) {
        GameObjects.findOne({owner: req.params.owner}).exec(function(err, userGameObjects) {
            if (err) {
                console.log('Game objects could not be loaded ' + err);
            }

            if (!userGameObjects) {
                console.log('Un-existing user required his game objects');
                res.status(404);
                res.end();
            }

            // sync call
            userObjectsHandler.refreshUserGameObjects(userGameObjects);

            // sync call
            userTasksHandler.cancelTask(userGameObjects, req.body.taskType, req.body.taskIndexToAddTo);

            userGameObjects.save(function(){
                res.send(userGameObjects);
            });
        })
    }
};