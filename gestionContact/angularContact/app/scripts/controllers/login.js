'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, authenticationService, $wakanda) {

    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function (credentials) {
        authenticationService.login(credentials).then(function (loginResult) {
          if (loginResult) {
            console.log('login success');

            $wakanda.$currentUser().then(function (user) {
              console.log('After login - Current user: ');
              console.log(user);
          }); 

          // $wakanda.$logout();
          
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        } else {

          console.log('login failed: invalid name or password');
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        
        }
      }, function () {
        console.log('login error');
        $rootScope.$broadcast(AUTH_EVENTS.loginError);
      }); 

    }; 
      

    $wakanda.$currentUser().then(function(user) {
      console.log('Before login - Current User is: ');
      console.log(user);
    });

  });
