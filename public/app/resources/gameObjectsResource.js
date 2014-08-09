'use strict';

app.factory('GameObjectsResource', function($resource) {
    var GameObjectsResource = $resource('/api/game-objects/:owner', {owner:'@owner'});

    return GameObjectsResource;
});