'use strict';

var GameObjects = require('mongoose').model('GameObjects'),
    game = require('../game/index');

module.exports = {
    handleAttack: function (transporters, tier1, tier2, tier3, turns, flightTime, source, targetID) {
        GameObjects.findOne({owner: targetID}).exec(function (err, target) {
            if (err) {
                console.log('Game objects for target could not be loaded ' + err);
            }

            var report = {
                time: new Date(),
                result: '',
                target: {
                    ships: [],
                    troops: [],
                    damage: []
                },
                attacker: {
                    ships: [],
                    damage: []
                }
            };

            for (var i = 0; i < turns; i++) {
                var attackerDamage = game.units.air.attack[0] * game.upgrades[source.upgrades[7]] * transporters +
                    game.units.air.attack[1] * game.upgrades[source.upgrades[7]] * tier1 +
                    game.units.air.attack[2] * game.upgrades[source.upgrades[7]] * tier2 +
                    game.units.air.attack[3] * game.upgrades[source.upgrades[7]] * tier3;

                var defenderDamage = game.units.air.attack[1] * game.upgrades[target.upgrades[7]] * target.ships[0] +
                    game.units.air.attack[1] * game.upgrades[target.upgrades[7]] * target.ships[1] +
                    game.units.air.attack[2] * game.upgrades[target.upgrades[7]] * target.ships[2] +
                    game.units.air.attack[3] * game.upgrades[target.upgrades[7]] * target.ships[3] +
                    game.units.ground.attack[0] * game.upgrades[target.upgrades[10]] * target.troops[0] +
                    game.units.ground.attack[1] * game.upgrades[target.upgrades[10]] * target.troops[1] +
                    game.units.ground.attack[2] * game.upgrades[target.upgrades[10]] * target.troops[2];

                report.target.ships.push([target.ships[0], target.ships[1], target.ships[2], target.ships[3]]);
                report.target.ships.push([target.troops[0], target.troops[1], target.troops[2]]);
                report.target.damage.push(defenderDamage);

                report.attacker.ships.push([transporters, tier1, tier2, tier3]);
                report.attacker.damage.push(attackerDamage);

                // one of the two guys is dead
                if (attackerDamage === 0 || defenderDamage === 0) {
                    break;
                }

                while (attackerDamage > 0) {
                    switch (true) {
                        case target.troops[0]:
                            attackerDamage /= game.units.ground.defence[0] * game.upgrades[target.upgrades[11]];
                            attackerDamage -= game.units.ground.health[0] * game.upgrades[target.upgrades[12]];
                            if (attackerDamage >= 0) {
                                target.troops[0]-=1;
                            }
                            break;
                        case target.troops[1]:
                            attackerDamage /= game.units.ground.defence[1] * game.upgrades[target.upgrades[11]];
                            attackerDamage -= game.units.ground.health[1] * game.upgrades[target.upgrades[12]];
                            if (attackerDamage >= 0) {
                                target.troops[1]-=1;
                            }
                            break;
                        case target.troops[2]:
                            attackerDamage /= game.units.ground.defence[2] * game.upgrades[target.upgrades[11]];
                            attackerDamage -= game.units.ground.health[2] * game.upgrades[target.upgrades[12]];
                            if (attackerDamage >= 0) {
                                target.troops[2]-=1;
                            }
                            break;
                        case  target.ships[1]:
                            attackerDamage /= game.units.air.defence[1] * game.upgrades[target.upgrades[8]];
                            attackerDamage -= game.units.air.health[1] * game.upgrades[target.upgrades[9]];
                            if (attackerDamage >= 0) {
                                target.ships[1]-=1;
                            }
                            break;
                        case  target.ships[2]:
                            attackerDamage /= game.units.air.defence[2] * game.upgrades[target.upgrades[8]];
                            attackerDamage -= game.units.air.health[2] * game.upgrades[target.upgrades[9]];
                            if (attackerDamage >= 0) {
                                target.ships[2]-=1;
                            }
                            break;
                        case  target.ships[3]:
                            attackerDamage /= game.units.air.defence[3] * game.upgrades[target.upgrades[8]];
                            attackerDamage -= game.units.air.health[3] * game.upgrades[target.upgrades[9]];
                            if (attackerDamage >= 0) {
                                target.ships[3]-=1;
                            }
                            break;
                        case  target.ships[0]:
                            attackerDamage /= game.units.air.defence[0] * game.upgrades[target.upgrades[8]];
                            attackerDamage -= game.units.air.health[0] * game.upgrades[target.upgrades[9]];
                            if (attackerDamage >= 0) {
                                target.ships[0]-=1;
                            }
                            break;
                    }
                }

                while (defenderDamage > 0) {
                    switch (true) {
                        case  tier1:
                            defenderDamage /= game.units.air.defence[1] * game.upgrades[source.upgrades[8]];
                            defenderDamage -= game.units.air.health[1] * game.upgrades[source.upgrades[9]];
                            if (defenderDamage >= 0) {
                                tier1-=1;
                            }
                            break;
                        case  tier2:
                            defenderDamage /= game.units.air.defence[2] * game.upgrades[source.upgrades[8]];
                            defenderDamage -= game.units.air.health[2] * game.upgrades[source.upgrades[9]];
                            if (defenderDamage >= 0) {
                                tier2-=1;
                            }
                            break;
                        case  tier3:
                            defenderDamage /= game.units.air.defence[3] * game.upgrades[source.upgrades[8]];
                            defenderDamage -= game.units.air.health[3] * game.upgrades[source.upgrades[9]];
                            if (defenderDamage >= 0) {
                                tier3-=1;
                            }
                            break;
                        case  transporters:
                            defenderDamage /= game.units.air.defence[0] * game.upgrades[source.upgrades[8]];
                            defenderDamage -= game.units.air.health[0] * game.upgrades[source.upgrades[9]];
                            if (defenderDamage >= 0) {
                                transporters-=1;
                            }
                            break;
                    }
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
};