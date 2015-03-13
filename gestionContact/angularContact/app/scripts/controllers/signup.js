'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('SignupCtrl', function ($scope, $wakanda) {

    initUser();
    $scope.passwordConfirm = '';
    $scope.rolesString = '';

    $scope.createUser = function () {
      if ($scope.user.password === $scope.passwordConfirm) {
        
        $scope.user.roles = $scope.rolesString.split(',');

        $wakanda.$ds.ServiceGestionUsers.createUser($scope.user).then(function () {
          initUser();
          alert('User created!');
        });
        
      } else {
        alert('Password and Confirme password do not match!');
      }
      // console.log($scope.user);
    };

    function initUser() {
      $scope.user = {
        nom: null,
        prenom: null,
        login: null,
        password: null,
        roles: []
      };
    }
  });
