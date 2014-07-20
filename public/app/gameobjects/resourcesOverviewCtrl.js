'use strict';

app.controller('ResourcesOverviewCtrl', function($scope, $routeParams, $interval, gameObjectsCache, gameModelsCache) {
    queryGameObjects();

    var all = gameModelsCache.getGameModels().$promise.then(function(all) {
        $scope.asd = all.mineralFactory;
    });


    $interval(queryGameObjects, 10000);

    function queryGameObjects() {
        gameObjectsCache.getResourceForUserId($routeParams.owner).$promise.then(function(resources) {
            $scope.currentResources = resources;
        })
    }
});
