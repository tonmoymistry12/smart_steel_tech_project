'use strict';

/**
 * @ngdoc overview
 * @name smartSteelProjApp
 * @description
 * # smartSteelProjApp
 *
 * Main module of the application.
 */
angular
  .module('smartSteelProjApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        url : '/signin',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
