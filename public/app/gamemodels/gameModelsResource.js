'use strict';

app.factory('GameModelsResource', function($resource) {
    var GameModelsResource = $resource('/api/game-models');

    return GameModelsResource;
});