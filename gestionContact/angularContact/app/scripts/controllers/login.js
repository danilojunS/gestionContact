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

      authenticationService.login(credentials).then(function (user) {
        console.log('login success');

        console.log(user);
        
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

      }, function () {
        console.log('login error');

        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);

      });

      
      
    };

  });
