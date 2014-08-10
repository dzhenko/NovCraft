'use strict';

app.factory('GameRequests', function($q, $http, identity) {
//    // targetID
//    var scanUserResource = $resource('/api/users-scan/:target', {owner:'@owner'});
//
//    // taskType, taskIndexToAddTo
//    var createTaskResource = $resource('/api/game-tasks/:owner', {owner:'@owner'});
//
//    // targetID, ships[], turns;
//    var createAttackResource = $resource('/api/game-attack/:owner', {owner:'@owner'});

    function makeRequest(url, data) {
        data = data || {};
        var deferred = $q.defer();

        $http.post(url, data).success(function(response) {
            if (response.success) {
                deferred.resolve(response);
            }
            else {
                deferred.resolve(false);
            }
        });

        return deferred.promise;
    }

    return {
        scanUser: function(targetID) {
            return makeRequest('/api/users-scan/' + targetID);
        },
        createTask: function (taskType, taskIndexToAddTo) {
            return makeRequest('/api/game-tasks/'+ identity.currentUser._id, {
                taskType : taskType,
                taskIndexToAddTo: taskIndexToAddTo
            });
        }
    }
});