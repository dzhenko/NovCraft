'use strict';

var usersController = require('../controllers/usersController'),
    coursesController = require('../controllers/coursesController'),
    gameObjectsController = require('../controllers/gameObjectsController');

module.exports = {
    users: usersController,
    courses: coursesController,
    gameObjects: gameObjectsController
};