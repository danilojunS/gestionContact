'use strict';

/**
 * @ngdoc directive
 * @name gestionContactApp.directive:roleShow
 * @description
 * # roleShow
 * Directive to controle the visibility of an element, based on the user roles.
 * Each role is entered as a string.
 * To input many roles, you can separate the roles with commas.
 * Ex: BusinessAnalyst,DataSteward
 */
angular.module('gestionContactApp')
  .directive('roleShow', function (authenticationService, sessionService) {
    return {
      restrict: 'A',
      scope: {}, // isolate the scope
      link: function postLink(scope, element, attrs) {
        
        // element is normally hidden
        element.hide();
        // remove spaces of the string and transform it into an array
        var roles = attrs.roleShow.replace(/\s+/g, '').split(',');
        
        // watch the user roles, information in the sessionService
        scope.$watch(function () {
            return sessionService.getUserRoles();
          }, function() {
            // update directive each time the roles change
            updateDirective();
        });
        
        // initialize directive
        updateDirective();

        /**
         * Function to update the directive, depending on the user roles.
         */
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
