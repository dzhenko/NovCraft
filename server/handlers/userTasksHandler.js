'use strict';

var game = require('../game/index');

function checkIfTaskCanBeStarted(objects, taskType, taskIndexToAddTo) {
    // count current tasks
    var currentTasks = {
        buildings : 0,
        ships: 0,
        troops: 0,
        upgrades: 0
    };

    for (var i = 0; i < objects.tasks.length; i++) {
        var task = currentTasks[i];
        currentTasks[task.type]++;
    }

    // only 1 building can be build at the same time
    if (taskType == 'buildings' && currentTasks.buildings == 1) {
        return false;
    }
    // level of troops barracks is not high enough to build more than X troops at the same time
    else if (taskType == 'troops' && currentTasks.troops >= game.buildings.troops.amount[objects.buildings[4]]) {
        return false;
    }
    // level of ship yard is not high enough to build more than X ships at the same time
    else if (taskType == 'ships' && currentTasks.ships >= game.buildings.ships.amount[objects.buildings[5]]) {
        return false;
    }
    // level of lab is not high enough to research more than X upgrades at the same time
    else if (taskType == 'upgrades' && currentTasks.upgrades >= game.buildings.upgrades.amount[objects.buildings[6]]) {
        return false;
    }

    // check if max level is reached
    if (taskType == 'buildings') {
        // everything can be upgraded only up to max level (last index of array).
        // if current building is already at last level - return false.
        switch (taskIndexToAddTo) {
            case 0 : return game.buildings.mineralFactory.amount.length - 1 > objects.buildings[taskIndexToAddTo];
            case 1 : return game.buildings.gasFactory.amount.length - 1 > objects.buildings[taskIndexToAddTo];
            case 2 : return game.buildings.solarPanels.amount.length - 1 > objects.buildings[taskIndexToAddTo];
            case 3:  return game.buildings.supply.amount.length - 1 > objects.buildings[taskIndexToAddTo];
            case 4 : return game.buildings.troops.amount.length - 1 > objects.buildings[taskIndexToAddTo];
            case 5 : return game.buildings.ships.amount.length - 1 > objects.buildings[taskIndexToAddTo];
            case 6 : return game.buildings.upgrades.amount.length - 1 > objects.buildings[taskIndexToAddTo];
            default : return false;
        }
    }
    else if (taskType == 'upgrades') {
        // everything can be upgraded only up to max level (last index of array).
        // if current upgrade is already at last level - return false.
        return game.upgrades.length - 1 > objects.upgrades[taskIndexToAddTo];
    }

    // if here than it can be afforded.
    return true;
}

function checkIfTaskCanBeAfforded(objects, taskType, taskIndexToAddTo) {
    var requestedObject;
    var cost;

    if (taskType == 'buildings') {
        var building;
        switch (taskIndexToAddTo) {
            case 0 : building = game.buildings.mineralFactory; break;
            case 1 : building = game.buildings.gasFactory; break;
            case 2 : building = game.buildings.solarPanels; break;
            case 3: building = game.buildings.supply; break;
            case 4 : building = game.buildings.troops; break;
            case 5 : building = game.buildings.ships; break;
            case 6 : building = game.buildings.upgrades; break;
            default : return false;
        }

        // check level now and afterwards
        // solar power difference
    }
    else if (taskType == 'ships') {
        requestedObject = game.ships[taskIndexToAddTo];
        // supply difference
    }
    else if (taskType == 'troops') {
        requestedObject = game.troops[taskIndexToAddTo];
    }
    else if (taskType == 'upgrades') {
        var currUpgradeLevel
    }
    else {
        // some error - invalid task type
        return false;
    }
}

function executeTask(objects, taskType, taskIndexToAddTo) {

}
// sync call
module.exports = {
    createTask: function (objects, taskType, taskIndexToAddTo) {

    },
    cancelTask: function (objects, taskType, taskIndexToAddTo) {

    }
};

//tasks: [
//    {
//        finishTime: Number,
//        type: { type: String, enum: ['buildings', 'ships', 'troops', 'upgrades'] },
//        indexToAddTo: Number
//    }
//],