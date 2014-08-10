'use strict';

// only one app so name is app
var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
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
        .when('/overview/:owner', {
            templateUrl: '/partials/overview/overview',
            controller: 'OverviewCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/buildings/:owner', {
            templateUrl: '/partials/buildings/buildings',
            controller: 'BuildingsCtrl',
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