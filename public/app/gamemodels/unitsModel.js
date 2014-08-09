'use strict';

app.factory('UnitsModel', function () {
    return {
        ships: {
            // transport tier1 tier2 tier3
            attack: [1, 15, 59, 99],
            defence: [5, 0, 10, 15],
            health: [200, 100, 300, 500],
            capacity: [15000, 500, 2000, 4000],
            minerals: [19999, 12999, 59999, 139999],
            gas: [3999, 0, 19999, 59999],
            supply: [2, 2, 3, 6],
            time: [199, 49, 299, 499]
        },
        troops: {
            // tier1 tier2 tier3
            attack: [6, 19, 34],
            defence: [5, 15, 30],
            health: [45, 130, 280],
            minerals: [3499, 15999, 34999],
            gas: [0, 5999, 16999],
            supply: [1, 1, 2],
            time: [139, 419, 699]
        }
    }
});