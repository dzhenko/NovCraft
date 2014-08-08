'use strict';

var usersController = require('../controllers/usersController'),
    gameTasksController = require('../controllers/gameTasksController'),
    gameObjectsController = require('../controllers/gameObjectsController');

module.exports = {
    users: usersController,
    gameObjects: gameObjectsController,
    gameTasks: gameTasksController
};