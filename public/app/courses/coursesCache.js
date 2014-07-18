'use strict';

app.factory('coursesCache', function(CoursesResource) {
    var cachedCourses;

    return {
        cachedCourses: cachedCourses,
        query: function() {
            if (!cachedCourses) {
                cachedCourses = CoursesResource.query();
            }

            return cachedCourses;
        }
    }
});