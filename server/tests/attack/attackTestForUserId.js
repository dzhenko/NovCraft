'use strict';

var mongoose = require('mongoose'),
    attack = require('../../handlers/attacksHandler');

function setUsersWithStats() {
    mongoose.model('User').find({}).exec(function (err, allUsers) {
        if (err) {
            console.log(err);
        }

        var user1Id = allUsers[0]._id;
        var user2Id = allUsers[1]._id;

        mongoose.model('GameObjects').findOne({owner: user1Id}).exec(function (err, obj) {
            if (err) {
                console.log(err);
            }

            obj.ships = [13, 24, 52, 27];
            obj.troops = [8, 2, 1];
            obj.buildings = [8, 8, 19, 18, 8, 8, 8];
            obj.upgrades = [1, 0, 2, 0, 3, 0, 4, 7, 7, 7, 0, 1, 1];
            obj.tasks = [
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 10,
                    type: 'upgrades',
                    indexToAddTo: 2
                },
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 9,
                    type: 'troops',
                    indexToAddTo: 2
                },
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 8,
                    type: 'ships',
                    indexToAddTo: 3
                }
            ];
            obj.defences = [
                {
                    sourceID: '53e777fd9efe98ec111e22c9',
                    source: [29, 998, 43],
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 6
                },
                {
                    sourceID: '53e777fd9efe98ec111e22c9',
                    source: [29, 998, 43],
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 5
                }
            ];
            obj.attacks = [
                {
                    target: '53e777fd9efe98ec111e22c9',
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 4,
                    ships: [1,1,1,1],
                    turns : 7,
                    flightTime: 44444
                },
                {
                    target: '53e777fd9efe98ec111e22c9',
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 3,
                    ships: [1,1,1,1],
                    turns : 8,
                    flightTime: 12321
                }
            ];
            obj.comebacks = [
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 2,
                    ships: [6, 3, 2, 1],
                    cargo: [1200, 200]
                },
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 11,
                    ships: [5, 4, 3, 2],
                    cargo: [300, 333]
                }
            ];
            obj.minerals = 400000;
            obj.gas = 200000;

            obj.save(function () {
                console.log('-------------------------------');
                console.log('saved ships for player ID ' + user1Id);
                console.log(obj);
                console.log('-------------------------------');
            })
        });

        mongoose.model('GameObjects').findOne({owner: user2Id}).exec(function (err, obj) {
            if (err) {
                console.log(err);
            }

            obj.ships = [13, 24, 52, 27];
            obj.troops = [8, 2, 1];
            obj.buildings = [8, 8, 19, 18, 8, 8, 8];
            obj.upgrades = [1, 0, 2, 0, 3, 0, 4, 7, 7, 7, 0, 1, 1];
            obj.tasks = [
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 11,
                    type: 'upgrades',
                    indexToAddTo: 2
                },
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 10,
                    type: 'troops',
                    indexToAddTo: 2
                },
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 9,
                    type: 'ships',
                    indexToAddTo: 3
                }
            ];
            obj.defences = [
                {
                    sourceID: '53e7777a9efe98ec111e22c7',
                    source: [29, 998, 43],
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 7
                },
                {
                    sourceID: '53e7777a9efe98ec111e22c7',
                    source: [29, 998, 43],
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 6
                }
            ];
            obj.attacks = [
                {
                    target: '53e7777a9efe98ec111e22c7',
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 5,
                    ships: [1,1,1,1],
                    turns : 7,
                    flightTime: 44444
                },
                {
                    target: '53e7777a9efe98ec111e22c7',
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 4,
                    ships: [1,1,1,1],
                    turns : 8,
                    flightTime: 12321
                }
            ];
            obj.comebacks = [
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 3,
                    ships: [6, 3, 2, 1],
                    cargo: [1200, 200]
                },
                {
                    time: (new Date()).getTime() + 1000 * 60 * 60 * 2,
                    ships: [5, 4, 3, 2],
                    cargo: [300, 333]
                }
            ];
            obj.minerals = 400000;
            obj.gas = 200000;

            obj.save(function () {
                console.log('-------------------------------');
                console.log('saved ships and troops for player ID ' + user2Id);
                console.log(obj);
                console.log('-------------------------------');
            })
        });
    });
}

function testHandleAttackFromAttackerObjectToUserId() {
    mongoose.model('User').find({}).exec(function (err, allUsers) {
        if (err) {
            console.log(err);
        }

        var user1Id = allUsers[0]._id;
        var user2Id = allUsers[1]._id;

        mongoose.model('GameObjects').findOne({owner: user1Id}).exec(function (err, obj) {
            if (err) {
                console.log(err);
            }
            console.log('attacker ' + obj);
            attack.handleAttackForTargetId({
                source: user1Id,
                ships: obj.ships,
                airUpgrades: [obj.upgrades[7], obj.upgrades[8], obj.upgrades[9]]
            }, user2Id, 15, 200);
        });
    });
}

function testHandleAttackSimulator() {
    console.dir(attack.handleAttack(
        {
            ships: [13, 44, 13, 5],
            airUpgrades: [3, 4, 5]
        },
        {
            troops: [17, 22, 8],
            groundUpgrades: [4, 5, 7],
            ships: [5, 14, 3, 1],
            airUpgrades: [5, 5 , 5]
        },
        15
    ))
}

module.exports = {
    simulator: testHandleAttackSimulator,
    setUsersWithStats: setUsersWithStats,
    testHandleAttackFromAttackerObjectToUserId: testHandleAttackFromAttackerObjectToUserId,
    testAttackDispatcherNotifierAfterUsersAreSetWithStats: function () {
        require('../../controllers/gameAttacksController').createAttack({
            params: {
                owner: '53e7777a9efe98ec111e22c7',
                targetID: '53e777fd9efe98ec111e22c9',
                ships: [12, 23, 31, 6],
                turns: 12
            }
        }, {
            send: function (stuff) {
                console.log(stuff);
            }
        })
    }
};