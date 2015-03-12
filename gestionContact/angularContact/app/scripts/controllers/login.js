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

    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function (credentials) {

      authenticationService.login(credentials).then(function (loginResult) {
        if (loginResult) {

          console.log('login success');
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

    // $scope.logout = function () {
    //   authenticationService.logout().then(function () {
    //     console.log('logout success');
    //   }, function () {
    //     console.log('logout error');
    //   });
    // }; 

    // $scope.getCurrentUser = function () {
    //   // $wakanda.$currentUser().then(function(user) {
    //   //   console.log(user);
    //   // });

    //   $wakanda.$ds.ServiceAuthentication.getCurrentUser().then(function (result) {
    //     console.log(result.result);
    //   });
    // }; 

    // $scope.userBelongsTo = function () {
    //   $wakanda.$currentUserBelongsTo('BusinessAnalyst').then(function (result) {
    //     console.log(result);
    //   });
    // }; 

  });
