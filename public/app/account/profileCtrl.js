'use strict';

app.controller('ProfileCtrl', function($scope, identity) {
    $scope.user = {
        username: identity.currentUser.username,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName
    }
});