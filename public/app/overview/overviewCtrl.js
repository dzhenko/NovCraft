'use strict';

app.controller('OverviewCtrl', function($scope, $rootScope, $interval, GameObjectsCache, RaceModel, identity, UpgradesModel, Calculator) {
    $scope.raceModel = RaceModel[identity.currentUser.race];
    $scope.raceModel.upgrades = UpgradesModel.names;

    queryGameObjects();

    // the client queries himself every 90 sec. The server is queried only once per 2 min
    $rootScope.objectsRefreshSeconds = $rootScope.objectsRefreshSeconds || 30;
    $interval(queryGameObjects, 1000 * $rootScope.objectsRefreshSeconds);

    function queryGameObjects() {
        GameObjectsCache.getGameObjectsForUser().$promise.then(function (objects) {
            $scope.gameObjects = objects;

            $scope.now = (new Date()).getTime();

            $scope.freeEnergy = Calculator.freeEnergy(objects);
            $scope.freeSupply = Calculator.freeSupply(objects);
            $scope.mineralsPerMinute = Calculator.mineralsPerMinute(objects);
            $scope.gasPerMinute = Calculator.gasPerMinute(objects);
        })
    }

    $scope.showAttackInfo = function (index) {
        $scope.attackInfoText = 'Your attack consists of';

        for (var i = 0; i < $scope.raceModel.ships.length; i++) {
            if ($scope.gameObjects.attacks[index].ships[i] == 0) {
                continue;
            }
            $scope.attackInfoText += ' ' + $scope.gameObjects.attacks[index].ships[i] + ' ' + $scope.raceModel.ships[i].name + 's';
        }

        $scope.attackInfoText += ' and will continue for ' + $scope.gameObjects.attacks[index].turns + ' turns.';
    }
});