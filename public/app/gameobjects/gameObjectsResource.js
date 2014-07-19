'use strict';

app.factory('GameObjectsResource', function($resource) {
    var GameObjectsResource = $resource('/api/resources/:owner', {owner:'@owner'});

    return GameObjectsResource;
});