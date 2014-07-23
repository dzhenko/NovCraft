'use strict';

var GameObjects = require('mongoose').model('GameObjects'),
    game = require('../game'),
    chance = require('../utilities/chance');

module.exports = {
    handleAttack: function (attacker, defender, turns) {
        var report = {
            time: new Date(),
            attacker: {
                ships: [],
                damage: []
            },
            defender: {
                ships: [],
                troops: [],
                damage: []
            }
        };

        for (var i = 0; i < turns; i++) {
            var attackerDamage = game.units.ships.attack[0] * game.upgrades[attacker.airUpgrades[0]] * attacker.ships[0] +
                game.units.ships.attack[1] * game.upgrades[attacker.airUpgrades[0]] * attacker.ships[1] +
                game.units.ships.attack[2] * game.upgrades[attacker.airUpgrades[0]] * attacker.ships[2] +
                game.units.ships.attack[3] * game.upgrades[attacker.airUpgrades[0]] * attacker.ships[3];

            var defenderDamage = game.units.troops.attack[0] * game.upgrades[defender.groundUpgrades[0]] * defender.troops[0] +
                game.units.troops.attack[1] * game.upgrades[defender.groundUpgrades[0]] * defender.troops[1] +
                game.units.troops.attack[2] * game.upgrades[defender.groundUpgrades[0]] * defender.troops[2] +
                game.units.ships.attack[1] * game.upgrades[defender.airUpgrades[0]] * defender.ships[0] +
                game.units.ships.attack[1] * game.upgrades[defender.airUpgrades[0]] * defender.ships[1] +
                game.units.ships.attack[2] * game.upgrades[defender.airUpgrades[0]] * defender.ships[2] +
                game.units.ships.attack[3] * game.upgrades[defender.airUpgrades[0]] * defender.ships[3];

            report.attacker.ships.push([attacker.ships[0], attacker.ships[1], attacker.ships[2], attacker.ships[3]]);
            report.attacker.damage.push(attackerDamage);

            report.defender.troops.push([defender.troops[0], defender.troops[1], defender.troops[2]]);
            report.defender.ships.push([defender.ships[0], defender.ships[1], defender.ships[2], defender.ships[3]]);
            report.defender.damage.push(defenderDamage);

            if (attackerDamage === 0 || defenderDamage === 0) {
                report.win = attackerDamage > 0;
                break;
            }

            while (attackerDamage > 0) {
                if (defender.troops[0] > 0) {
                    attackerDamage -= game.units.troops.health[0] * game.upgrades[defender.groundUpgrades[2]] *
                        chance.doubleHealth(game.units.troops.defence[0] * game.upgrades[defender.groundUpgrades[1]]);
                    defender.troops[0] -= (attackerDamage >= 0 ? 1 : 0);
                }
                else if (defender.troops[1] > 0) {
                    attackerDamage -= game.units.troops.health[1] * game.upgrades[defender.groundUpgrades[2]] *
                        chance.doubleHealth(game.units.troops.defence[1] * game.upgrades[defender.groundUpgrades[1]]);
                    defender.troops[1] -= (attackerDamage >= 0 ? 1 : 0);
                }
                else if (defender.troops[2] > 0) {
                    attackerDamage -= game.units.troops.health[2] * game.upgrades[defender.groundUpgrades[2]] *
                        chance.doubleHealth(game.units.troops.defence[2] * game.upgrades[defender.groundUpgrades[1]]);
                    defender.troops[2] -= (attackerDamage >= 0 ? 1 : 0);
                }
                else if (defender.ships[1] > 0) {
                    attackerDamage -= game.units.ships.health[1] * game.upgrades[defender.airUpgrades[2]] *
                        chance.doubleHealth(game.units.ships.defence[1] * game.upgrades[defender.airUpgrades[1]]);
                    defender.ships[1] -= (attackerDamage >= 0 ? 1 : 0);
                }
                else if (defender.ships[2] > 0) {
                    attackerDamage -= game.units.ships.health[2] * game.upgrades[defender.airUpgrades[2]] *
                        chance.doubleHealth(game.units.ships.defence[2] * game.upgrades[defender.airUpgrades[1]]);
                    defender.ships[2] -= (attackerDamage >= 0 ? 1 : 0);
                }
                else if (defender.ships[3] > 0) {
                    attackerDamage -= game.units.ships.health[3] * game.upgrades[defender.airUpgrades[2]] *
                        chance.doubleHealth(game.units.ships.defence[3] * game.upgrades[defender.airUpgrades[1]]);
                    defender.ships[3] -= (attackerDamage >= 0 ? 1 : 0);
                }
                else if (defender.ships[0] > 0) {
                    attackerDamage -= game.units.ships.health[0] * game.upgrades[defender.airUpgrades[2]] *
                        chance.doubleHealth(game.units.ships.defence[0] * game.upgrades[defender.airUpgrades[1]]);
                    defender.ships[0] -= (attackerDamage >= 0 ? 1 : 0);
                }
                else {
                    break;
                }
            }

            while (defenderDamage > 0) {
                if (attacker.ships[1] > 0) {
                    defenderDamage -= game.units.ships.health[1] * game.upgrades[attacker.airUpgrades[2]] *
                        chance.doubleHealth(game.units.ships.defence[1] * game.upgrades[attacker.airUpgrades[1]]);
                    attacker.ships[1] -= (defenderDamage >= 0 ? 1 : 0);
                }
                else if (attacker.ships[2] > 0) {
                    defenderDamage -= game.units.ships.health[2] * game.upgrades[attacker.airUpgrades[2]] *
                        chance.doubleHealth(game.units.ships.defence[2] * game.upgrades[attacker.airUpgrades[1]]);
                    attacker.ships[2] -= (defenderDamage >= 0 ? 1 : 0);
                }
                else if (attacker.ships[3] > 0) {
                    defenderDamage -= game.units.ships.health[3] * game.upgrades[attacker.airUpgrades[2]] *
                        chance.doubleHealth(game.units.ships.defence[3] * game.upgrades[attacker.airUpgrades[1]]);
                    attacker.ships[3] -= (defenderDamage >= 0 ? 1 : 0);
                }
                else if (attacker.ships[0] > 0) {
                    defenderDamage -= game.units.ships.health[0] * game.upgrades[attacker.airUpgrades[2]] *
                        chance.doubleHealth(game.units.ships.defence[0] * game.upgrades[attacker.airUpgrades[1]]);
                    attacker.ships[0] -= (defenderDamage >= 0 ? 1 : 0);
                }
                else {
                    break;
                }
            }
        }

        return report;
    },
    handleAttackForTargetId: function (attacker, targetID, turns, flightTime) {
        GameObjects.findOne({owner: targetID}).exec(function (err, defender) {
            if (err) {
                console.log('Game objects for target could not be loaded ' + err);
            }

            var report = this.handleAttack(attacker, {
                troops: [defender.troops[0], defender.troops[1], defender.troops[2]],
                groundUpgrades: [defender.upgrades[10], defender.upgrades[11], defender.upgrades[12]],
                ships: [defender.ships[0], defender.ships[1], defender.ships[2], defender.ships[3]],
                airUpgrades: [defender.upgrades[7], defender.upgrades[8], defender.upgrades[9]]
            }, turns);

            // if any survivor
            //sourceGameObjects.returns.push({
            //    time: (flightTime + (new Date()).getTime()),
            //    ships: [],
            //    cargo: [],
            //    report: {}
            //});

            // saves the effects of the attack
            //sourceGameObjects.save();
            //target.save();
        });
    },
    simulateAttack: function (attacker, defender, turns) {
        var report = this.handleAttack(attacker, defender, turns, 0);
    }
};