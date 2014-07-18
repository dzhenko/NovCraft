'use strict';

app.controller('SettingsCtrl', function($scope, $location, identity, auth, notifier) {
    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName
    };

    $scope.hidePasswordInputs = true;
    $scope.showPassword = function(){
        $scope.user.password = '';
        $scope.hidePasswordInputs = false;
    };

    $scope.update = function(user) {
        auth.update(user).then(function() {
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            notifier.success('Update successful !');
            $location.path('/');
        })
    }
});