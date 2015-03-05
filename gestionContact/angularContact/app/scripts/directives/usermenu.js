'use strict';

/**
 * @ngdoc directive
 * @name gestionContactApp.directive:userMenu
 * @description
 * # userMenu
 */
angular.module('gestionContactApp')
  .directive('userMenu', function (authenticationService, sessionService, AUTH_EVENTS) {
    return {
      templateUrl: 'views/usermenu.html',
      restrict: 'A',
      link: function postLink(scope) {
        scope.userName = sessionService.getUserName();

        scope.$watch(function () {
            return sessionService.getUserName();
          }, function(userName) {
            scope.userName = userName;
        });

        scope.logout = function() {
          authenticationService.logout().then(function () {

            scope.$emit(AUTH_EVENTS.logoutSuccess);

            console.log('logout success');

          }, function () {

            console.log('logout error');

          });
        };
      }
    };
  });
