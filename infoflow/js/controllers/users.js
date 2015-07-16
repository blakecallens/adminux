(function() {
  'use strict';

  angular.module('infoflow.controllers.users', [])
  .controller('UsersController', [
    '$rootScope',
    '$scope',
    '$location',
    function($rootScope, $scope, $location) {
      $rootScope.currentView = 'users';
      $scope.selectedItem = $location.search().item || '1';

      $scope.setSelectedItem = function(index) {
        $scope.selectedItem = index.toString();
      }

      $scope.$watch('selectedItem', function(newVal, oldVal) {
        if(newVal !== oldVal) {
          $location.search('item', newVal);
        }
      });
    }
  ]);
}());
