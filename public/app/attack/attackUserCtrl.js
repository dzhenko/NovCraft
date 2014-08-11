'use strict';

app.controller('AttackUserCtrl', function ($scope, $location, $routeParams, ShipsModel, GameObjectsCache, GameRequests, RaceModel , notifier, identity) {
    $scope.selectTurns = 10;
    $scope.raceModel = RaceModel[identity.currentUser.race];
    $scope.shipsModel = ShipsModel;
    $scope.ships = [0, 0, 0, 0];

    GameObjectsCache.getGameObjectsForUser().$promise.then(function (objects) {
        $scope.userShips = objects.ships;
    });

    $scope.confirm = function () {
        $scope.confirmerText = 'Are you sure you want to send';
        for (var i = 0; i < $scope.ships.length; i++) {
            var shipAmmount = $scope.ships[i];
            if (shipAmmount > 0) {
                $scope.confirmerText += ' '+ shipAmmount+ ' ' + $scope.raceModel.ships[i].name + 's,';
            }
        }

        $scope.confirmerText +=' to fight for ' + $scope.selectTurns + ' turns?';
    };

    $scope.confirmerAccept = function () {
        console.log($scope.ships);
        console.log($scope.selectTurns);
        GameRequests.createAttack($routeParams.target, $scope.ships, $scope.selectTurns).then(function(response) {
            if (response.success) {
                notifier.success('Attack sent');
                GameObjectsCache.refresh();
                GameObjectsCache.getGameObjectsForUser().$promise.then(function (objects) {
                    $scope.userShips = objects.ships;
                });
            }
            else {
                notifier.error('Not enough minerals or energy');
            }
        }, function(error) {
            console.log(error);
        });
    };
});