'use strict';

var Resource = require('mongoose').model('Resource');

module.exports = {
    getResourcesForUserId: function(req, res, next) {
        Resource.findOne({owner: req.params.owner}).exec(function(err, resource) {
            if (err) {
                console.log('Resource could not be loaded ' + err);
            }

            if (!resource) {
                console.log('Un-existing user required his resources');
                res.status(404);
                res.end();
            }

            var diffMin = Math.round((new Date() - resource.updated) / 60000);
            resource.updated = new Date();
            resource.minerals = diffMin * resource.growRate[0];
            resource.minerals = diffMin * resource.growRate[1];

            resource.save(function(){
                res.send(resource);
            });
        })
    }
};