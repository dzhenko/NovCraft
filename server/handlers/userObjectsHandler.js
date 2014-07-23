'use strict';

var GameObjects = require('mongoose').model('GameObjects'),
    game = require('../game/index'),
    attackHandler = require('../handlers/attacksHandler');

function handleAttack(transporters, tier1, tier2, tier3, turns, flightTime, source, targetID) {
    GameObjects.findOne({owner: targetID}).exec(function (err, target) {
        if (err) {
            console.log('Game objects for target could not be loaded ' + err);
        }

        for (var i = 0; i < turns; i++) {
            var attackerAttack = game.units.air.attack[0] * game.upgrades[source.upgrades[7]] * transporters +
                                 game.units.air.attack[1] * game.upgrades[source.upgrades[7]] * tier1 +
                                 game.units.air.attack[2] * game.upgrades[source.upgrades[7]] * tier2 +
                                 game.units.air.attack[3] * game.upgrades[source.upgrades[7]] * tier3;

            var defenderAttack = game.units.air.attack[1] * game.upgrades[target.upgrades[7]] * target.ships[0] +
                                 game.units.air.attack[1] * game.upgrades[target.upgrades[7]] * target.ships[1] +
                                 game.units.air.attack[2] * game.upgrades[target.upgrades[7]] * target.ships[2] +
                                 game.units.air.attack[3] * game.upgrades[target.upgrades[7]] * target.ships[3] +
                                 game.units.ground.attack[0] * game.upgrades[target.upgrades[10]] * target.troops[0] +
                                 game.units.ground.attack[1] * game.upgrades[target.upgrades[10]] * target.troops[1] +
                                 game.units.ground.attack[2] * game.upgrades[target.upgrades[10]] * target.troops[2];

            while (attackerAttack > 0) {

            }

            while (defenderAttack > 0) {

            }
        }


        // if any survivor
        sourceGameObjects.returns.push({
            time: (flightTime + (new Date()).getTime()),
            ships: [],
            cargo: [],
            report: {}
        });

        // saves the effects of the attack
        sourceGameObjects.save();
        target.save();
    });
}

// TODO: Rename to index
module.exports = {
    // working in sync
    refreshUserGameObjects: function (objects) {
        // updating
        var now = (new Date()).getTime();
        var diffMs = now - objects.updated;
        objects.updated = newUpdated;

        // resources
        objects.minerals += Math.round(
                ((diffMs / 60000) * game.buildings.mineralFactory.amount[objects.buildings[0]]) *
                (game.upgrades.multiplier[objects.upgrades[0]])
        );
        objects.gas += Math.round(
                ((diffMs / 60000) * game.buildings.gasFactory.amount[objects.buildings[1]]) *
                (game.upgrades.multiplier[objects.upgrades[1]])
        );

        var i;
        // tasks
        // reverse iteration to prevent splice reordering of indexes
        for (i = objects.tasks.length - 1; i >= 0; i--) {
            var task = objects.tasks[i];

            if (task.finishTime <= now) {
                objects[task.type][task.indexToAddTo]++;

                // removing the task
                objects.tasks.splice(i, 1);
            }
        }

        // defences - remove warnings if they have happened
        for (i = objects.defences.length - 1; i >= 0; i--) {
            if (task.finishTime <= now) {
                objects.defences.splice(i, 1);
            }
        }

        // attackers are home
        for (i = objects.comebacks.length - 1; i >= 0; i--) {
            var comeback = objects.comebacks[i];

            if (comeback.time <= now) {
                // resources
                objects.minerals += comeback.cargo[0];
                objects.gas += comeback.cargo[1];

                // ships back to bay
                for (var s = 0; s < comeback.ships.length; s++) {
                    objects.ships[s] += comeback.ships[s];
                }

                // removing the task
                objects.comebacks.splice(i, 1);
            }
        }

        // attacks - pass to attack handler and remove from array
        for (i = objects.attacks.length - 1; i >= 0; i--) {
            if (objects.attacks[i].time <= now) {
                var ships = objects.attacks[i].ships;

                // call async func and remove from array
                attackHandler.handleAttackForTargetId({
                        ships: [ships[0], ships[1], ships[2], ships[3]],
                        airUpgrades: [objects.upgrades[7], objects.upgrades[8], objects.upgrades[9]]
                    },
                    objects.attacks[i].target,
                    objects.attacks[i].turns,
                    objects.attacks[i].flightTime);

                objects.attacks.splice(i, 1);
            }
        }
    }
};