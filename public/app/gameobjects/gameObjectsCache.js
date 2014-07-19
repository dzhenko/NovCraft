'use strict';

app.factory('gameObjectsCache', function(GameObjectsResource) {
    var cachedGameObjects;

    return {
        getResourceForUserId: function(id) {
            if (!cachedGameObjects || Math.round((new Date() - cachedGameObjects.updated) / 60000) > 1) {
                cachedGameObjects = GameObjectsResource.get({owner:id});
            }

            return cachedGameObjects;
        }
    }
});