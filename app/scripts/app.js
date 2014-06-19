'use strict';

var app = angular.module('tiyFinalApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'ui.bootstrap',
    'google-maps',
    'ngGPlaces',
    'underscore'
  ]);

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; 
});

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/random', {
        templateUrl: 'views/random.html',
        controller: 'RandomCtrl'
      })
    .when('/library', {
        templateUrl: 'views/library.html',
        controller: 'MainCtrl'
      })
    .when('/posts/:postId', {
        templateUrl: 'views/updatepost.html',
        controller: 'PostViewCtrl'
      })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/search/:zipcode/:place', {
        templateUrl: 'views/map.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
})
.constant('FIREBASE_URL', 'https://shawn-final.firebaseio.com/');

