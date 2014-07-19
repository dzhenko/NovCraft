'use strict';

app.factory('coursesCache', function(CoursesResource) {
    var cachedCourses;

    return {
        query: function() {
            if (!cachedCourses) {
                cachedCourses = CoursesResource.query();
            }

            return cachedCourses;
        }
    }
});