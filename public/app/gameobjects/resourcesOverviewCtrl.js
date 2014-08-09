'use strict';

app.controller('ResourcesOverviewCtrl', function($scope, $routeParams, $interval, gameObjectsCache, BuildingsModel) {
    $scope.buildingsModel = BuildingsModel;

    queryGameObjects();

    $interval(queryGameObjects, 10000);

    function queryGameObjects() {
        gameObjectsCache.getGameObjectsForUserId($routeParams.owner).$promise.then(function(objects) {
            $scope.gameObjects = objects;
        })
    }
});