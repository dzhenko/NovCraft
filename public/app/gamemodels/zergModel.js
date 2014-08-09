'use strict';

app.factory('ZergModel', function() {
    return {
        buildings: {
            mineralFactory: {
                name: 'Hive',
                image: 'http://img4.wikia.nocookie.net/__cb20090708231423/starcraft/images/f/f0/Hive_SC2_Rend1.jpg',
                alt: 'Hive',
                description: 'The Hive serves as the hub of any zerg base providing the precious minerals.'
            },
            gasFactory: {
                name: 'Extractor',
                image: 'http://img3.wikia.nocookie.net/__cb20090708231200/starcraft/images/3/3b/Extractor_SC2_Rend1.jpg',
                alt: 'Extractor',
                description: 'The Extractor is a zerg building used for harvesting vespene gas.'
            },
            solarPanels: {
                name: 'Nest core',
                image: 'http://img1.wikia.nocookie.net/__cb20090711011823/starcraft/images/8/83/BanelingNest_SC2_Rend1.jpg',
                alt: 'Nest core',
                description: 'The Nest core is the zerg building used for supplying energy for the other buildings'
            },
            supply: {
                name: 'Nydus Network',
                image: 'http://img2.wikia.nocookie.net/__cb20090708231829/starcraft/images/e/ef/NydusNetwork_SC2_Rend1.jpg',
                alt: 'Nydus Network',
                description: 'The zerg Nydus Network provides the supply needed to build a great army'
            },
            troops: {
                name: 'Roach Warren',
                image: 'http://img2.wikia.nocookie.net/__cb20090708231912/starcraft/images/a/a3/RoachWarren_SC2_Rend1.jpg',
                alt: 'Roach Warren',
                description: 'The Roach Warren builds all the scary zerg troops.'
            },
            ships: {
                name: 'Greater Spire',
                image: 'http://img2.wikia.nocookie.net/__cb20090708231242/starcraft/images/2/27/GreaterSpire_SC2_Rend1.jpg',
                alt: 'Greater Spire',
                description: 'The zerg Greater Spire morphs all the ships of the mighty zerg race.'
            },
            lab: {
                name: 'Evolution Chamber',
                image: 'http://img3.wikia.nocookie.net/__cb20090630035933/starcraft/images/3/36/EvolutionChamber_SC2_DevRend2.jpg',
                alt: 'Evolution Chamber',
                description: 'The zerg EvolutionChamber provides the ability to research upgrades'
            }
        },
        units: {
            ships: {
                image: 'http://img1.wikia.nocookie.net/__cb20110213143938/starcraft/images/d/d8/Mutalisk_SC2_Head1.gif',
                transport: {
                    name: 'Overlord',
                    image: 'http://img1.wikia.nocookie.net/__cb20100817144901/starcraft/images/1/17/Overlord_SC2_Rend1.jpg',
                    alt: 'Overlord',
                    description: 'The zerg Overlord, is a flying protoss robotic machine designed for transportation.'
                },
                tier1: {
                    name: 'Mutalisk',
                    image: 'http://img3.wikia.nocookie.net/__cb20090511221650/starcraft/images/e/e9/Mutalisk_SC2_DevRend2.png',
                    alt: 'Mutalisk',
                    description: 'The zerg Mutalisk is a tier 1 spaceship'
                },
                tier2: {
                    name: 'Corruptor',
                    image: 'http://img3.wikia.nocookie.net/__cb20080603115750/starcraft/images/8/89/Corruptor_SC2_Art1.jpg',
                    alt: 'Corruptor',
                    description: 'The zerg Corruptor ray is a deadly tier 2 spaceship'
                },
                tier3: {
                    name: 'Brood Lord',
                    image: 'http://img1.wikia.nocookie.net/__cb20110212030028/starcraft/images/e/ee/BroodLord_SC2_Rend1.jpg',
                    alt: 'Brood Lord',
                    description: 'The zerg Brood Lord is the most superior spaceship.'
                }
            },
            troops: {
                image: 'http://img4.wikia.nocookie.net/__cb20110213204932/starcraft/images/0/08/Hydralisk_SC2_Head1.gif',
                tier1: {
                    name: 'Roach',
                    image: 'http://img3.wikia.nocookie.net/__cb20080701195047/starcraft/images/c/c5/Roach_SC2_Rend1.jpg',
                    alt: 'Roach',
                    description: 'The zerg Roach is a good tier 1 defender.'
                },
                tier2: {
                    name: 'Hydralisk',
                    image: 'http://img4.wikia.nocookie.net/__cb20090407222208/starcraft/images/b/bf/Hydralisk_SC2_DevRend2.jpg',
                    alt: 'Hydralisk',
                    description: 'The zerg Hydralisk is a deadly tier 2 defender.'
                },
                tier3: {
                    name: 'Ultralisk',
                    image: 'http://img1.wikia.nocookie.net/__cb20090129014840/starcraft/images/c/c9/Ultralisk_SC2_Rend1.jpg',
                    alt: 'Ultralisk',
                    description: 'The zerg Ultralisk is the most superior defender.'
                }
            }
        }
    }
});