'use strict';

app.factory('UsersResource', function($resource) {
    var UserResource = $resource('/api/users/:id', {_id: '@id'}, {update: {method:'PUT', isArray:false}});

    UserResource.prototype.isAdmin = function() {
        return (this.roles && this.roles.indexOf('admin') >= 0);
    };

    return UserResource;
});