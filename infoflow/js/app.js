(function() {
  'use strict';

  angular.module('infoflow.app', [
    'ngRoute',
    'ngSanitize',
    'infoflow.controllers.main',
    'infoflow.controllers.users',
    'infoflow.controllers.social'
  ])
  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'views/users.html',
        controller: 'UsersController',
        reloadOnSearch: false
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersController',
        reloadOnSearch: false
      })
      .when('/social', {
        templateUrl: 'views/social.html',
        controller: 'SocialController',
        reloadOnSearch: false
      })
    }
  ]);
}());
