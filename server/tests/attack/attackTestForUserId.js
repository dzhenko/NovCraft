'use strict';

var mongoose = require('mongoose'),
    modelsExports = require('../../models'),
    attack = require('../../handlers/attacksHandler');

function setUsersWithStats() {
    mongoose.model('User').find({}).exec(function(err, allUsers) {
        if (err) {
            console.log(err);
        }

        var user1Id = allUsers[0]._id;
        var user2Id = allUsers[1]._id;

        mongoose.model('GameObjects').findOne({owner: user1Id}).exec(function(err, obj) {
            if (err) {
                console.log(err);
            }

            obj.ships = [13, 24, 52, 27];
            obj.upgrades = [0,0,0,0,0,0,4,7,7,7,0,1,1];

            obj.save(function() {
                console.log('-------------------------------');
                console.log('saved ships for player ID ' + user1Id);
                console.log(obj);
                console.log('-------------------------------');
            })
        });

        mongoose.model('GameObjects').findOne({owner: user2Id}).exec(function(err, obj) {
            if (err) {
                console.log(err);
            }

            obj.ships = [13, 24, 32, 7];
            obj.troops = [12, 22, 5];
            obj.upgrades = [0,0,0,0,0,0,4,7,7,7,4,4,4];
            obj.minerals = 192384;
            obj.gas = 999999999;

            obj.save(function() {
                console.log('-------------------------------');
                console.log('saved ships and troops for player ID ' + user2Id);
                console.log(obj);
                console.log('-------------------------------');
            })
        });
    });
}

function testHandleAttackFromAttackerObjectToUserId() {
    mongoose.model('User').find({}).exec(function(err, allUsers) {
        if (err) {
            console.log(err);
        }

        var user1Id = allUsers[0]._id;
        var user2Id = allUsers[1]._id;

        mongoose.model('GameObjects').findOne({owner: user1Id}).exec(function(err, obj) {
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
            airUpgrades: [3,4,5]
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
    simulator : testHandleAttackSimulator,
    testAttackId1: function() {
        modelsExports.report.removeAll();
        setUsersWithStats();
        testHandleAttackFromAttackerObjectToUserId();
    }
};