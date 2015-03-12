'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('SignupCtrl', function ($scope) {

    $scope.user = {
      nom: null,
      prenom: null,
      login: null,
      password: null
    };

    $scope.createUser = function () {
      if ($scope.user.password === $scope.passwordConfirm) {
        console.log('passwords match !');
        // call function to create user !
      }
      console.log($scope.user);
    };
  });
