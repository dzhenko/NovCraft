'use strict';

app.controller('ResourcesOverviewCtrl', function($scope, $routeParams, $interval, gameObjectsCache) {
    queryGameObjects();

    $interval(queryGameObjects, 10000);

    function queryGameObjects() {
        gameObjectsCache.getResourceForUserId($routeParams.owner).$promise.then(function(resources) {
            $scope.currentResources = resources;
            console.log('required resource');
        })
    }
});
