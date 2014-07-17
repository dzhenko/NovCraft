'use strict';

app.factory('UsersResource', function($resource) {
    var UserResource = $resource('/api/users/:id', {_id: '@id'});

    UserResource.prototype.isAdmin = function() {
        return (this.roles && this.roles.indexOf('admin') >= 0);
    };

    return UserResource;
});