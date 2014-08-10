'use strict';

app.controller('BuildingsCtrl',
    function ($scope, $routeParams, $interval, gameObjectsCache, RaceModel, identity, BuildingsModel, UpgradesModel, Calculator, notifier, GameRequests) {
        $scope.raceModel = RaceModel[identity.currentUser.race];
        $scope.buildingsModel = BuildingsModel;
        $scope.upgradesModel = UpgradesModel;

        $scope.filteredTasks = [];
        $scope.calculator = Calculator;

        queryGameObjects();
        //TODO: add link in the attack source coords to scan player

        // the client querries himself every 90 sec. The server is querried only once per 2 min
        $interval(queryGameObjects, 1000 * 90);

        function queryGameObjects() {
            gameObjectsCache.getGameObjectsForUserId($routeParams.owner).$promise.then(function (objects) {
                $scope.filteredTasks = objects.tasks
                    .filter(function (obj) {
                        return obj.type == 'buildings'
                    });

                $scope.gameObjects = objects;

                $scope.now = (new Date()).getTime();

                $scope.freeEnergy = Calculator.freeEnergy(objects);
                $scope.freeSupply = Calculator.freeSupply(objects);
                $scope.mineralsPerMinute = Calculator.mineralsPerMinute(objects);
                $scope.gasPerMinute = Calculator.gasPerMinute(objects);
            })
        }

        $scope.confirmerText = '';
        var buildingIndex = -1;

        $scope.confirm = function (index) {
            buildingIndex = index;
            $scope.confirmerText = 'This building will cost you ' +
                BuildingsModel[buildingIndex].cost[$scope.gameObjects.buildings[buildingIndex] + 1] + ' minerals and ' +
                ( BuildingsModel[buildingIndex].energy[$scope.gameObjects.buildings[buildingIndex] + 1] -
                    BuildingsModel[buildingIndex].energy[$scope.gameObjects.buildings[buildingIndex]] ) + ' energy and will take ' +
                Calculator.convertToTime(Math.round(BuildingsModel[buildingIndex].time[$scope.gameObjects.buildings[buildingIndex] + 1] *
                    (2 - UpgradesModel.multiplier[$scope.gameObjects.upgrades[2]]))) + ' to build';
        };

        $scope.confirmerAccept = function () {
            GameRequests.createTask('buildings', buildingIndex).then(function (response) {
                console.log(response);
                if (response.success) {
                    notifier.success('Building started');
                    gameObjectsCache.refresh();
                    queryGameObjects();
                }
                else {
                    notifier.error('Not enough minerals or energy');
                }
            }, function (error) {
                alert(error)
            })
        };
    });