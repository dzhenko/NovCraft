'use strict';

app.factory('gameObjectsCache', function(GameObjectsResource) {
    var cachedGameObjects;

    return {
        getGameObjectsForUserId: function(id) {
            if (!cachedGameObjects || (new Date().getTime()) - cachedGameObjects.updated >= 120000 ||
                cachedGameObjects.owner !== id) {
                cachedGameObjects = GameObjectsResource.get({owner:id});
            }

            return cachedGameObjects;
        }
    }
});