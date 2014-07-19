'use strict';

app.factory('CoursesResource', function($resource) {
    var CoursesResource = $resource('/api/courses/:id', {id: '@id'}, {update: {method:'PUT', isArray:false}});

    return CoursesResource;
});