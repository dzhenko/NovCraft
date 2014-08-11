'use strict';

app.controller('ScanOverviewCtrl', function ($scope, $routeParams, GameRequests, RaceModel , notifier, identity) {
    GameRequests.scanUser($routeParams.target).then(function (response) {
        if (!response.success) {
            notifier.error('Not enough resources for a scan');
            return;
        }

        notifier.success('Scan was successful');

        $scope.raceModel = RaceModel[identity.currentUser.race];
        $scope.enemy = response.targetObjects;

    }, function (error) {
        console.log(error)
    });
});