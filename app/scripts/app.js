'use strict';

var app = angular.module('tiyFinalApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/random', {
        authRequired: true,
        templateUrl: 'views/random.html',
        controller: ''
      })
    .when('/library', {
        authRequired: true,
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
        controller: ''
      })
      .otherwise({
        redirectTo: '/'
      });
})
.constant('FIREBASE_URL', 'https://shawn-final.firebaseio.com/');

