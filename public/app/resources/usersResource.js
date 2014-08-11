'use strict';

app.factory('UsersResource', function($resource) {
    return $resource('/api/users/:id', {_id: '@id'}, {update: {method:'PUT', isArray:false}});
});