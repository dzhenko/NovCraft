'use strict';

app.controller('NavCtrl', function ($scope, $location, notifier, identity) {
    $scope.identity = identity;
});