'use strict';

var GameObjects = require('mongoose').model('GameObjects'),
    game = require('../game/index'),
    attackHandler = require('../handlers/attacksHandler');

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
                        source: objects.owner,
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