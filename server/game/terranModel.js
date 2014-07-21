'use strict';

module.exports = {
    getTerranModel : function() {
        return {
            mineralFactory: {
                name: 'Command center',
                image: 'http://img2.wikia.nocookie.net/__cb20081104001909/starcraft/images/7/7b/Command_Center_SC2_Rend1.jpg'
            },
            gasFactory: {
                name: 'Refinery',
                image: 'http://img3.wikia.nocookie.net/__cb20080629225502/starcraft/images/6/6d/Refinery_SC2_Game1.jpg'
            },
            solarPanels: {
                name: '',
                image: ''
            },
            supply: {
                name: '',
                image: ''
            },
            barracks: {
                name:'',
                image: ''
            },
            shipYard: {
                name: '',
                image: ''
            },
            lab: {
                name:'',
                image:''
            }
        }
    }
};