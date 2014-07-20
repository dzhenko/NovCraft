'use strict';

app.factory('gameObjectsCache', function(GameObjectsResource) {
    var cachedGameObjects;

    return {
        getResourceForUserId: function(id) {
            if (!cachedGameObjects || (new Date().getTime()) - cachedGameObjects.updated >= 60000 ||
                cachedGameObjects.owner !== id) {
                cachedGameObjects = GameObjectsResource.get({owner:id});
            }

            return cachedGameObjects;
        }
    }
});