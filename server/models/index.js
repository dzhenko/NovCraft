'use strict';

var userModel = require('../models/User'),
    courseModel = require('../models/Course'),
    gameObjectsModel = require('../models/GameObjects');

module.exports = {
    user: userModel,
    course: courseModel,
    gameObjects: gameObjectsModel
};