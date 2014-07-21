'use strict';

app.factory('UpgradesModel', function () {
    return {
        multiplier: [1.00, 1.01, 1.02, 1.03, 1.05, 1.07, 1.09, 1.12, 1.15, 1.18, 1.22, 1.26, 1.30],
        names: [
            'Increased minerals production rate',             //index 0
            'Increased gas production rate',                  //index 1

            'Increased buildings construction speed',         //index 2
            'Increased air units construction speed',         //index 3
            'Increased ground units construction speed',      //index 4

            'Increased transporter ship carry capacity',      //index 5

            'Increased air units flight speed',               //index 6
            'Increased air units attack',                     //index 7
            'Increased air units defence',                    //index 8
            'Increased air units health',                     //index 9

            'Increased ground units attack',                  //index 10
            'Increased ground units defence',                 //index 11
            'Increased ground units health'                   //index 12
        ]
    }
});