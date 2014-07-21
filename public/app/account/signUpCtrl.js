'use strict';

app.controller('SignUpCtrl', function($scope, $location, auth, notifier) {
    var $body = $('body');

    $scope.signup = function(user) {
        auth.signup(user).then(function() {
            notifier.success('Registration successful !');
            $location.path('/');
        });
    };

    $scope.changeRace = function(race) {
        $scope.user.race = race;

        $body.removeClass('zerg-back');
        $body.removeClass('protoss-back');
        $body.removeClass('terran-back');

        $('body').addClass(race + '-back');
    }
});