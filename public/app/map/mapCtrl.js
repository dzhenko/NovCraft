'use strict';

app.controller('MapCtrl', function ($scope, GameRequests, identity) {
    GameRequests.getAllUsers().then(function (users) {
        $scope.allUsers = users.filter(function (user) {
            return user.username !== identity.currentUser.username;
        });
    }, function (error) {
        console.log(error);
    });
});