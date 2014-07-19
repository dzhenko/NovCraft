'use strict';

var usersController = require('../controllers/usersController'),
    coursesController = require('../controllers/coursesController'),
    resourcesController = require('../controllers/resourcesController');

module.exports = {
    users: usersController,
    courses: coursesController,
    resources: resourcesController
};