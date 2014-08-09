'use strict';

app.factory('TerranModel', function() {
    return {
        buildings: {
            mineralFactory: {
                name: 'Command Center',
                image: 'http://img2.wikia.nocookie.net/__cb20100725194510/starcraft/images/a/a7/OrbitalCommand_SC2_Rend1.jpg',
                alt: 'Command Center',
                description: 'The Command Center serves as the hub of any terran base providing the precious minerals.'
            },
            gasFactory: {
                name: 'Refinery',
                image: 'http://img3.wikia.nocookie.net/__cb20080629225502/starcraft/images/6/6d/Refinery_SC2_Game1.jpg',
                alt: 'Refinery',
                description: 'The Refinery is a terran building used for harvesting vespene gas.'
            },
            solarPanels: {
                name: 'Fusion core',
                image: 'http://img3.wikia.nocookie.net/__cb20100716232527/starcraft/images/7/75/FusionCore_SC2_Rend1.jpg',
                alt: 'Fusion core',
                description: 'The Fusion core is the terran building used for supplying energy for the other buildings'
            },
            supply: {
                name: 'Supply Depot',
                image: 'http://img3.wikia.nocookie.net/__cb20080629221708/starcraft/images/4/4e/SupplyDepot_SC2_DevGame2.jpg',
                alt: 'Supply Depot',
                description: 'The terran Supply Depot provides the supply needed to build a great army'
            },
            troops: {
                name: 'Barracks',
                image: 'http://img4.wikia.nocookie.net/__cb20080629230915/starcraft/images/7/78/Barracks_SC2_Game1.jpg',
                alt: 'Barracks',
                description: 'Barracks create all the mighty terran warriors.'
            },
            ships: {
                name: 'Starport',
                image: 'http://img3.wikia.nocookie.net/__cb20080629223825/starcraft/images/2/25/Starport_SC2_DevRend2.jpg',
                alt: 'Starport',
                description: 'The Starport provides the terran race with its home ship army.'
            },
            lab: {
                name: 'Armory',
                image: 'http://img2.wikia.nocookie.net/__cb20100716232157/starcraft/images/b/ba/Armory_SC2_Rend1.jpg',
                alt: 'Armory',
                description: 'The terran Armory provides the ability to research upgrades'
            }
        },
        units: {
            ships: {
                image: 'http://img2.wikia.nocookie.net/__cb20110408231333/starcraft/images/b/bc/Battlecruiser_SC2_HeadAnim1.gif',
                transport: {
                    name: 'Dropship',
                    image: 'http://img1.wikia.nocookie.net/__cb20090829122920/starcraft/images/5/57/MedivacDropship_SC2_DevRend2.jpg',
                    alt: 'Dropship',
                    description: 'The terran dropship, is a spaceship designed for transportation.'
                },
                tier1: {
                    name: 'Raven',
                    image: 'http://img2.wikia.nocookie.net/__cb20090129013727/starcraft/images/a/ad/Nighthawk_SC2_Rend1.jpg',
                    alt: 'Raven',
                    description: 'The terran Raven is a tier 1 spaceship'
                },
                tier2: {
                    name: 'Banshee',
                    image: 'http://img1.wikia.nocookie.net/__cb20090419001652/starcraft/images/0/0d/Banshee_SC2_DevRend2.jpg',
                    alt: 'Banshee',
                    description: 'The terran Banshee ray is a deadly tier 2 spaceship'
                },
                tier3: {
                    name: 'Battlecruiser',
                    image: 'http://img3.wikia.nocookie.net/__cb20090708231108/starcraft/images/9/94/BattlecruiserYamato_SC2_Rend1.jpg',
                    alt: 'Battlecruiser',
                    description: 'The terran Battlecruiser is the most superior spaceship.'
                }
            },
            troops: {
                image: 'http://img1.wikia.nocookie.net/__cb20110213152619/starcraft/images/6/64/Thor_SC2_Head1.gif',
                tier1: {
                    name: 'Marauder',
                    image: 'http://img2.wikia.nocookie.net/__cb20110218165959/starcraft/images/2/28/Marauder_SC2_Rend1.jpg',
                    alt: 'Marauder',
                    description: 'The terran Marauder is a good tier 1 defender.'
                },
                tier2: {
                    name: 'Viking',
                    image: 'http://img1.wikia.nocookie.net/__cb20080628185129/starcraft/images/a/ac/VikingGroundMode_SC2_Game1.jpg',
                    alt: 'Viking',
                    description: 'The terran Viking is a deadly tier 2 defender.'
                },
                tier3: {
                    name: 'Thor',
                    image: 'http://img2.wikia.nocookie.net/__cb20100817135552/starcraft/images/2/21/Thor_SC2_Rend1.jpg',
                    alt: 'Thor',
                    description: 'The terran Thor is the most superior defender.'
                }
            }
        }
    }
});