'use strict';

/**
 * @ngdoc directive
 * @name gestionContactApp.directive:roleShow
 * @description
 * # roleShow
 */
angular.module('gestionContactApp')
  .directive('roleShow', function (authenticationService, sessionService) {
    return {
      // template: '<div></div>',
      restrict: 'A',
      scope: {}, // isolate the scope
      link: function postLink(scope, element, attrs) {
        element.hide(); // element is normally hidden
        var roles = attrs.roleShow.replace(/\s+/g, '').split(','); // remove spaces of the string and transform it into an array
        // console.log(roles);
        scope.$watch(function () {
            return sessionService.getUserRole();
          }, function() {
            updateDirective();
        });
        
        updateDirective();

        function updateDirective() {
          if (authenticationService.isAuthorized(roles)) {
            element.show();
          } else {
            element.hide();
          }
        }
      }
    };
  });
