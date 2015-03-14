'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, authenticationService) {

    // user information for the login
    $scope.credentials = {
      email: '',
      password: ''
    };

    /**
     * Function to perform the login
     * 
     * @param  {Object} credentials of the user (username and password)
     */
    $scope.login = function (credentials) {

      // all logic to perform authentication operations in the back-end is encapsulated
      // in the authenticationService
      authenticationService.login(credentials).then(function (loginResult) {
        if (loginResult) {

          console.log('login success');
          // broadcast message to the app, that will perform the correct route
          // more information about the authentication events can be found in the app.js file
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

        } else {

          console.log('login failed: invalid name or password');
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);

          alert('Error: Invalid Name or Password!');
        
        }
      }, function () {
        console.log('login error');
        $rootScope.$broadcast(AUTH_EVENTS.loginError);
      }); 

    };

  });
