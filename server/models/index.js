'use strict';

var userModel = require('../models/User'),
    courseModel = require('../models/Course'),
    messageModel = require('../models/Message'),
    reportModel = require('../models/Report'),
    gameObjectsModel = require('../models/GameObjects');

module.exports = {
    user: userModel,
    course: courseModel,
    gameObjects: gameObjectsModel,
    message: messageModel,
    report: reportModel
};