'use strict';

app.controller('CourseDetailsCtrl', function($scope, $routeParams, coursesCache) {
    coursesCache.query().$promise.then(function(collection){
        collection.forEach(function(course){
            if (course._id === $routeParams.id) {
                $scope.course = course;
            }
        })
    });
});