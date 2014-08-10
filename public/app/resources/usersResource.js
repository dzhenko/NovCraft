'use strict';

app.factory('UsersResource', function($resource) {
    var UserResource = $resource('/api/users/:id', {_id: '@id'}, {update: {method:'PUT', isArray:false}});

    return UserResource;
});