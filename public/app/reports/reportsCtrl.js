'use strict';

app.controller('ReportsCtrl', function ($scope, GameRequests, identity, RaceModel) {
    var currentReports = JSON.parse(localStorage.getItem('novcraft-userobjects-userreports-'+identity.currentUser._id)) || [];

    GameRequests.getUserReports().then(function (responce) {
        var newReports = currentReports.concat(responce.allReports);
        localStorage.setItem('novcraft-userobjects-userreports-'+identity.currentUser._id, JSON.stringify(newReports));

        $scope.allReports = newReports;

    }, function (error) {
        console.log(error);
    });

    $scope.raceModel = RaceModel[identity.currentUser.race];
    $scope.Math = Math;

    $scope.deleteReport = function(index) {
        currentReports.splice(index,1);
        localStorage.setItem('novcraft-userobjects-userreports-'+identity.currentUser._id, JSON.stringify(currentReports));
        $scope.allReports = currentReports;
    };

    $scope.viewReport = function (index) {
        $scope.selectedReport = $scope.allReports[index];
        console.log($scope.selectedReport)
    }
});