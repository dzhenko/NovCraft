'use strict';

app.controller('CoursesListCtrl', function($scope, coursesCache) {
    $scope.sortOptions = [
        {value: '_id', text: 'Default'},
        {value: 'name', text: 'Course Name'},
        {value: 'date', text: 'Publish date'}
    ];
    $scope.sort = '_id';
    $scope.courses = coursesCache.query();
});

