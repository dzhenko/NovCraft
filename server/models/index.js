'use strict';

var userModel = require('../models/User'),
    courseModel = require('../models/Course');

module.exports = {
    user: userModel,
    course: courseModel
};