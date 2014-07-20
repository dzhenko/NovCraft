'use strict';

app.factory('gameModelsCache', function(GameModelsResource) {
    var cachedGameModels;

    return {
        getGameModels: function() {
            if (!cachedGameModels) {
                cachedGameModels = GameModelsResource.get();
            }

            return cachedGameModels;
        }
    }
});