'use strict';

/**
 * @ngdoc directive
 * @name gestionContactApp.directive:userMenu
 * @description
 * # userMenu
 * Directive that represents the User Menu at the top of the page.
 * If the user is not logged in, it shows a login button.
 * Else, it shows a link to the user profile and a button to logout.
 */
angular.module('gestionContactApp')
  .directive('userMenu', function (authenticationService, sessionService, AUTH_EVENTS) {
    return {
      templateUrl: 'views/usermenu.html',
      restrict: 'A',
      scope: {}, // isolate the scope
      link: function postLink(scope) {
        // put the username in the scope
        scope.userName = sessionService.getUserName();

        // watch for changes in the user name
        scope.$watch(function () {
            return sessionService.getUserName();
          }, function(userName) {
            // updates the user name
            scope.userName = userName;
        });

        /**
         * Function of logout.
         */
        scope.logout = function() {
          // call to the back-end method to perform the logout of the user
          authenticationService.logout().then(function () {
            // send event logoutSuccess event to the application
            scope.$emit(AUTH_EVENTS.logoutSuccess);

            console.log('logout success');

          }, function () {

            console.log('logout error');

          });
        };
      }
    };
  });
