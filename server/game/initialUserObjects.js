'use strict';

module.exports = {
    getDefaultResourcesForUser: function (user) {
        return {
            owner: user,
            growRate: [1, 0],
            updated: (new Date()).getTime(),
            minerals: 250,
            gas: 0,
            energy: 15,
            supply: 10
        }
    }
};