'use strict';

app.factory('ProtossModel', function() {
    return {
        buildings: {
            mineralFactory: {
                name: 'Nexus',
                image: 'http://img2.wikia.nocookie.net/__cb20090719192439/starcraft/images/b/b7/Nexus_SC2_DevRend3.jpg',
                alt: 'Nexus',
                description: 'The Nexus serves as the hub of any protoss base providing the precious minerals.'
            },
            gasFactory: {
                name: 'Assimilator',
                image: 'http://img1.wikia.nocookie.net/__cb20090129231558/starcraft/images/4/42/Assimilator_SC2_Rend1.jpg',
                alt: 'Assimilator',
                description: 'The Assimilator is a protoss building used for harvesting vespene gas.'
            },
            solarPanels: {
                name: 'Cybernetics core',
                image: 'http://img2.wikia.nocookie.net/__cb20090129231417/starcraft/images/8/8d/CyberneticsCore_SC2_DevRend2.jpg',
                alt: 'Cybernetics core',
                description: 'The Cybernetics core is the protoss building used for supplying energy for the other buildings'
            },
            supply: {
                name: 'Pylon',
                image: 'http://img3.wikia.nocookie.net/__cb20081019210108/starcraft/images/a/ad/Pylon_SC2_DevRend3.jpg',
                alt: 'Pylon',
                description: 'The protoss Pylon provides the supply needed to build a great army'
            },
            troops: {
                name: 'Gateway',
                image: 'http://img2.wikia.nocookie.net/__cb20090129232926/starcraft/images/6/6a/Gateway_SC2_Rend1.jpg',
                alt: 'Gateway',
                description: 'Gateways create a swirling rift that warps in protoss warriors.'
            },
            ships: {
                name: 'Stargate',
                image: 'http://img2.wikia.nocookie.net/__cb20081019220804/starcraft/images/9/9e/Stargate_SC2_Rend1.jpg',
                alt: 'Stargate',
                description: 'The Stargate provides a warp link strong enough to call ships to a planets surface.'
            },
            lab: {
                name: 'Forge',
                image: 'http://img4.wikia.nocookie.net/__cb20090129231907/starcraft/images/2/21/Forge_SC2_DevRend3.jpg',
                alt: 'Forge',
                description: 'The protoss Forge provides the ability to research upgrades'
            }
        },
        units: {
            ships: {
                image: 'http://img3.wikia.nocookie.net/__cb20110213203818/starcraft/images/e/e5/Carrier_SC2_Head1.gif',
                transport: {
                    name: 'Warp prism',
                    image: 'http://img2.wikia.nocookie.net/__cb20090129012049/starcraft/images/6/69/WarpPrism_SC2_Rend1.jpg',
                    alt: 'Warp prism',
                    description: 'The protoss warp prism, is a flying protoss robotic machine designed for transportation.'
                },
                tier1: {
                    name: 'Phoenix',
                    image: 'http://img1.wikia.nocookie.net/__cb20090129010039/starcraft/images/3/3d/Phoenix_SC2_Rend1.jpg',
                    alt: 'Phoenix',
                    description: 'The protoss Phoenix is a tier 1 spaceship'
                },
                tier2: {
                    name: 'Void ray',
                    image: 'http://starcraft.wikia.com/wiki/Void_ray?file=VoidRay_SC2_Rend1.jpg',
                    alt: 'Void ray',
                    description: 'The protoss Void ray is a deadly tier 2 spaceship'
                },
                tier3: {
                    name: 'Carrier',
                    image: 'http://img3.wikia.nocookie.net/__cb20090516031103/starcraft/images/a/a8/Carrier_SC2_DevRend1.jpg',
                    alt: 'Carrier',
                    description: 'The protoss Carrier is the most superior spaceship.'
                }
            },
            troops: {
                image: 'http://img2.wikia.nocookie.net/__cb20110213202251/starcraft/images/4/48/Archon_SC2_Head1.gif',
                tier1: {
                    name: 'Stalker',
                    image: 'http://img3.wikia.nocookie.net/__cb20090129010543/starcraft/images/9/9f/Stalker_SC2_render2.jpg',
                    alt: 'Stalker',
                    description: 'The protoss Stalker is a good tier 1 defender.'
                },
                tier2: {
                    name: 'Immortal',
                    image: 'http://img1.wikia.nocookie.net/__cb20081019212305/starcraft/images/6/6f/Immortal_SC2_Rend1.jpg',
                    alt: 'Immortal',
                    description: 'The protoss Immortal is a deadly tier 2 defender.'
                },
                tier3: {
                    name: 'Archon',
                    image: 'http://img2.wikia.nocookie.net/__cb20090128235706/starcraft/images/3/3a/Archon_SC2_Rend2.jpg',
                    alt: 'Archon',
                    description: 'The protoss Archon is the most superior defender.'
                }
            }
        }
    }
});