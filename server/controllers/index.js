'use strict';

var usersController = require('../controllers/usersController'),
    coursesController = require('../controllers/coursesController');

module.exports = {
    users: usersController,
    courses: coursesController
};