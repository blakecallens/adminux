(function() {
  'use strict';

  angular.module('infoflow.controllers.social', [])
  .controller('SocialController', [
    '$rootScope',
    '$scope',
    '$http',
    '$sce',
    '$location',
    function($rootScope, $scope, $http, $sce, $location) {
      $rootScope.currentView = 'social';

      /*
      *  THIS IS A QUICK FALLBACK IN CASE THE LIVE CODE EXAMPLE, USING A FACTORY
      *  AND NG-RESOURCE DOESN'T RUN PROPERLY. YOU SHOULD USE FACTORIES AND
      *  SERVICES FOR THIS KIND OF THING.
      */

      $scope.setSelectedPost = function(permalink) {
        $scope.selectedPost = permalink;
      };

      $scope.$watch('selectedPost', function(newVal, oldVal) {
        if(newVal !== oldVal) {
          $scope.showingMoreInfo = false;
          $location.search('post', newVal);

          for(var i = 0; i < $scope.posts.length; i++) {
            if($scope.posts[i].data.permalink === newVal) {
              $scope.selectedPostObject = $scope.posts[i];
              return;
            }
          };

          $scope.selectedPostObject = $scope.posts[0];
        }
      });

      $scope.getInfoHtml = function() {
        if(!$scope.selectedPostObject) {
          return '';
        }

        var html = $scope.replaceEncodedHtml($scope.selectedPostObject.data.selftext_html);
        return $sce.trustAsHtml(html);
      };

      $scope.toggleShowingMoreInfo = function() {
        $scope.showingMoreInfo = !$scope.showingMoreInfo;
      };

      $scope.replaceEncodedHtml = function(html) {
        return html.replace(/&lt;/g, '<')
                   .replace(/&gt;/g, '>')
                   .replace(/&amp;/g, '&')
                   .replace(/&quot;/g, '"')
                   .replace(/&#39;/g, '\'');
      };

      $http.jsonp('http://api.reddit.com/r/fitness/hot?jsonp=JSON_CALLBACK')
      .success(function(result) {
        $scope.posts = result.data.children;
        for(var i = 0; i < $scope.posts.length; i++) {
          if(!$scope.posts[i].data.selftext_html) {
            $scope.posts.splice(i, 1);
            i--;
          }
        }

        $scope.selectedPost = $location.search().post || '0';
      })
      .error(function(result) {

      });
    }
  ]);
}());
