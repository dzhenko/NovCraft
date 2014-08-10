'use strict';

app.factory('Calculator', function(BuildingsModel, ShipsModel, TroopsModel, UpgradesModel) {
    function freeEnergy(objects) {
        var indexes = objects.buildings;
        var energy = BuildingsModel[2].amount[indexes[2]];

        for (var i = 0; i < BuildingsModel.length; i++) {
            energy-= BuildingsModel[i].energy[indexes[i]];
        }

        return energy;
    }

    function freeSupply(objects) {
        var supply = BuildingsModel[3].amount[objects.buildings[3]];
        var troopsIndexes = objects.troops;
        var shipsIndexes = objects.ships;

        supply -= TroopsModel.supply[0] * troopsIndexes[0];
        supply -= TroopsModel.supply[1] * troopsIndexes[1];
        supply -= TroopsModel.supply[2] * troopsIndexes[2];

        supply -= ShipsModel.supply[0] * shipsIndexes[0];
        supply -= ShipsModel.supply[1] * shipsIndexes[1];
        supply -= ShipsModel.supply[2] * shipsIndexes[2];
        supply -= ShipsModel.supply[3] * shipsIndexes[3];

        var i;
        // includes all the attacking ships
        for (i = 0; i < objects.attacks.length; i++) {
            var attackShips = objects.attacks[i].ships;

            supply -= ShipsModel.supply[0] * attackShips[0];
            supply -= ShipsModel.supply[1] * attackShips[1];
            supply -= ShipsModel.supply[2] * attackShips[2];
            supply -= ShipsModel.supply[3] * attackShips[3];
        }

        // includes all the returning ships
        for (i = 0; i < objects.comebacks.length; i++) {
            var returningShips = objects.comebacks[i].ships;

            supply -= ShipsModel.supply[0] * returningShips[0];
            supply -= ShipsModel.supply[1] * returningShips[1];
            supply -= ShipsModel.supply[2] * returningShips[2];
            supply -= ShipsModel.supply[3] * returningShips[3];
        }

        // includes all the ships and troops being built
        for (i = 0; i < objects.tasks.length; i++) {
            var task = objects.tasks[i];

            if (task.type == 'ships') {
                supply -= ShipsModel.supply[task.indexToAddTo];
            }
            else if (task.type == 'troops') {
                supply -= TroopsModel.supply[task.indexToAddTo];
            }
        }

        return supply;
    }

    function convertToTime(minutes) {
        return Math.floor(minutes / 60) + ' hours , ' + minutes % 60 + ' minutes';
    }

    function canAffordBuilding(objects, index) {
        var cost = BuildingsModel[index].cost[objects.buildings[index] + 1];
        var energy = BuildingsModel[index].energy[objects.buildings[index] + 1];

        if (objects.minerals < cost) {
            return false;
        }

        return freeEnergy(objects) >= energy
    }

    function canAffordShip(objects, index) {
        var cost = BuildingsModel[index].cost[objects.buildings[index] + 1];
        var energy = BuildingsModel[index].energy[objects.buildings[index] + 1];
    }

    function canAffordTroop(objects, index) {
        var cost = BuildingsModel[index].cost[objects.buildings[index] + 1];
        var energy = BuildingsModel[index].energy[objects.buildings[index] + 1];
    }

    function canAffordUpgrade(objects, index) {
        var cost = BuildingsModel[index].cost[objects.buildings[index] + 1];
        var energy = BuildingsModel[index].energy[objects.buildings[index] + 1];
    }

    function mineralsPerMinute(objects) {
        return Math.round(UpgradesModel.multiplier[objects.upgrades[0]] * BuildingsModel[0].amount[objects.buildings[0]]);
    }

    function gasPerMinute(objects) {
        return Math.round(UpgradesModel.multiplier[objects.upgrades[1]] * BuildingsModel[1].amount[objects.buildings[1]]);
    }

    return {
        freeEnergy: freeEnergy,
        freeSupply: freeSupply,
        convertToTime: convertToTime,
        canAffordBuilding: canAffordBuilding,
        canAffordShip: canAffordShip,
        canAffordTroop: canAffordTroop,
        canAffordUpgrade: canAffordUpgrade,
        mineralsPerMinute: mineralsPerMinute,
        gasPerMinute: gasPerMinute
    }
});