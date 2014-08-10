'use strict';

app.controller('TroopsCtrl',
    function ($scope, $interval, gameObjectsCache, RaceModel, identity, BuildingsModel, TroopsModel, Calculator, notifier, GameRequests) {
        $scope.raceModel = RaceModel[identity.currentUser.race];
        $scope.buildingsModel = BuildingsModel;
        $scope.troopsModel = TroopsModel;

        $scope.calculator = Calculator;

        queryGameObjects();
        //TODO: add link in the attack source coords to scan player

        // the client querries himself every 90 sec. The server is querried only once per 2 min
        $interval(queryGameObjects, 1000 * 90);

        function queryGameObjects() {
            gameObjectsCache.getGameObjectsForUser().$promise.then(function (objects) {
                $scope.filteredTasks = objects.tasks
                    .filter(function (obj) {
                        return obj.type == 'troops'
                    });

                $scope.gameObjects = objects;

                $scope.now = (new Date()).getTime();

                $scope.freeEnergy = Calculator.freeEnergy(objects);
                $scope.freeSupply = Calculator.freeSupply(objects);
                $scope.mineralsPerMinute = Calculator.mineralsPerMinute(objects);
                $scope.gasPerMinute = Calculator.gasPerMinute(objects);
            })
        }

        var troopsIndex = -1;
        $scope.confirm = function (index) {
            troopsIndex = index;
            $scope.confirmerText = Calculator.requiredResourcesMessage($scope.gameObjects, 'troops', index);
        };

        $scope.confirmerAccept = function () {
            GameRequests.createTask('troops', troopsIndex).then(function (response) {
                if (response.success) {
                    notifier.success('Unit construction started');
                    gameObjectsCache.refresh();
                    queryGameObjects();
                }
                else {
                    notifier.error('Not enough minerals, gas or supply');
                }
            }, function (error) {
                alert(error)
            })
        };
    });