'use strict';

// only one app so name is app
var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://img*.wikia.nocookie.net/**'
    ]);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                var userRace = auth.isAuthenticated();
                if (userRace) {
                    $('body').removeClass('zerg-back').removeClass('protoss-back').removeClass('terran-back')
                        .addClass(userRace + '-back');
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };

    $routeProvider
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/settings', {
            templateUrl: '/partials/account/settings',
            controller: 'SettingsCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/overview', {
            templateUrl: '/partials/overview/overview',
            controller: 'OverviewCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/buildings', {
            templateUrl: '/partials/buildings/buildings',
            controller: 'BuildingsCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/ships', {
            templateUrl: '/partials/ships/ships',
            controller: 'ShipsCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/troops', {
            templateUrl: '/partials/troops/troops',
            controller: 'TroopsCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/upgrades', {
            templateUrl: '/partials/upgrades/upgrades',
            controller: 'UpgradesCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/', {
            templateUrl: '/partials/home/home',
            controller: 'HomeCtrl'
        })
        .otherwise({redirectTo: '/'})
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});