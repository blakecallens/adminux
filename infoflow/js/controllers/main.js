(function() {
  'use strict';

  angular.module('infoflow.controllers.main', [])
  .controller('MainController', [
    '$rootScope',
    '$scope',
    '$window',
    function($rootScope, $scope, $window) {
      if(angular.element($window).width() >= 768) {
        angular.element('.navbar-nav>li>a').tooltip({
          placement: 'right',
          delay: 400
        });
      }
    }
  ]);
}());
