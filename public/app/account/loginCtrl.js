'use strict';

app.controller('LoginCtrl', function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function (user) {
        auth.login(user).then(function (success) {
            if (success) {
                notifier.success('Successful login!');
                $('body').removeClass('zerg-back').removeClass('protoss-back').removeClass('terran-back')
                    .addClass(identity.currentUser.race + '-back');
                $location.path('/resources/'+ identity.currentUser._id)
            }
            else {
                notifier.error('Invalid username or password');
            }
        })
    };

    $scope.logout = function () {
        auth.logout().then(function () {
            notifier.success('Successful logout');
            $scope.user = {};

            $('body').removeClass('zerg-back').removeClass('protoss-back').removeClass('terran-back');
            $location.path('/');
        });
    }
});