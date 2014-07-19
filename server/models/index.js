'use strict';

var userModel = require('../models/User'),
    courseModel = require('../models/Course'),
    resourceModel = require('../models/Resource');

module.exports = {
    user: userModel,
    course: courseModel,
    resource: resourceModel
};