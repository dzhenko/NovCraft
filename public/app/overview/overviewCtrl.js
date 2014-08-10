'use strict';

app.controller('OverviewCtrl', function($scope, $interval, gameObjectsCache, RaceModel, identity, UpgradesModel, Calculator) {
    $scope.raceModel = RaceModel[identity.currentUser.race];
    $scope.raceModel.upgrades = UpgradesModel.names;

    queryGameObjects();
    //TODO: add link in the attack source coords to scan player

    // the client querries himself every 90 sec. The server is querried only once per 2 min
    $interval(queryGameObjects, 1000 * 90);

    function queryGameObjects() {
        gameObjectsCache.getGameObjectsForUser().$promise.then(function(objects) {
            $scope.gameObjects = objects;
            $scope.now = (new Date()).getTime();

            console.log(objects);

            $scope.freeEnergy = Calculator.freeEnergy(objects);
            $scope.freeSupply = Calculator.freeSupply(objects);
            $scope.mineralsPerMinute = Calculator.mineralsPerMinute(objects);
            $scope.gasPerMinute = Calculator.gasPerMinute(objects);
        })
    }
});