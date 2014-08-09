'use strict';

app.controller('OverviewCtrl', function($scope, $routeParams, $interval, gameObjectsCache, BuildingsModel) {
    $scope.buildingsModel = BuildingsModel;

    queryGameObjects();

    // the client querries himself every 30 sec. The server is querried only once per 2 min
    $interval(queryGameObjects, 1000 * 30);

    function queryGameObjects() {
        gameObjectsCache.getGameObjectsForUserId($routeParams.owner).$promise.then(function(objects) {
            $scope.gameObjects = objects;
            console.log(objects);
        })
    }
});