'use strict';

app.controller('ResourcesOverviewCtrl', function($scope, $routeParams, gameObjectsCache) {
    gameObjectsCache.getResourceForUserId($routeParams.owner).$promise.then(function(resources){
        $scope.currentResources = resources;
    });
});
