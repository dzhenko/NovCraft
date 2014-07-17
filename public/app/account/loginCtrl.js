'use strict';

app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
            }
            else {
                notifier.error('Invalid username or password');
            }
        })
    };

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout');
            $scope.user = {};
            $location.path('/');
        });
    }
});