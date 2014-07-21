'use strict';

app.controller('ResourcesOverviewCtrl', function($scope, $routeParams, $interval, gameObjectsCache, BuildingsModel) {
    $scope.buildingsModel = BuildingsModel;

    queryGameObjects();

    $interval(queryGameObjects, 10000);

    function queryGameObjects() {
        gameObjectsCache.getGameObjectsForUserId($routeParams.owner).$promise.then(function(objects) {
            $scope.gameObjects = objects;
        })
    }
});


//    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
//    minerals: Number,
//    gas: Number,
//    updated: Number,
//    tasks: [
//    {
//        finishTime: Number,
//        type: String,
//        indexToAddTo: Number
//    }
//],
//    // mineral gas energy supply barracks ships lab - only indexes
//    buildings: [0, 0, 0, 0, 0, 0, 0],
//    // transport tier 1 tier 2 tier 3
//    ships: [0, 0, 0, 0],
//    // tier 1 tier 2 tier 3
//    troops: [0, 0, 0],

//    upgrades: [0,0,0,0,0,0,0],
//    attacks: [
//    {
//        // player ID
//        source: Number,
//        // player ID
//        target: Number,
//        // time of take off
//        start: Number,
//        // time of land home (half time is time of HIT
//        finish: Number,
//        // attacker's transport tier1 tier2 tier3 ships
//        attacker: [Number]
//    }
//]