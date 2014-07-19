'use strict';

// only one app so name is app
var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider) {
    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
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
        .when('/resources/:owner', {
            templateUrl: '/partials/gameobjects/overview',
            controller: 'ResourcesOverviewCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/courses', {
            templateUrl: '/partials/courses/courses-list',
            controller: 'CoursesListCtrl'
        })
        .when('/courses/:id', {
            templateUrl: '/partials/courses/course-details',
            controller: 'CourseDetailsCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});