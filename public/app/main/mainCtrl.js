'use strict';

app.controller('MainCtrl', function($scope, coursesCache) {
    $scope.courses = coursesCache.query();
});