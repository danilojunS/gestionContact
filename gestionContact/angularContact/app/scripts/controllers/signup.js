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

    init();

    $scope.createUser = function () {
      if ($scope.user.password === $scope.passwordConfirm) {
        
        $scope.user.roles = $scope.rolesString.split(',');

        $wakanda.$ds.ServiceGestionUsers.createUser($scope.user).then(function (result) {
          if (result.result.result) {
            alert('User created!');
            init();
          } else {
            if(result.result.loginTaken) {
              alert('Login already taken!');
            }
            else {
              alert('User not created!');
            }
          }
        });
        
      } else {
        alert('Password and Confirme password do not match!');
      }
      // console.log($scope.user);
    };

    function init() {
      $scope.user = {
        nom: null,
        prenom: null,
        login: null,
        password: null,
        roles: []
      };
      $scope.passwordConfirm = '';
      $scope.rolesString = '';
    }
  });
