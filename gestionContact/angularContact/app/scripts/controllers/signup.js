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

    // initialize scope
    init();

    /**
     * Function to create a user.
     * It accesses the back-end, creates the user and returns the result of the operation.
     */
    $scope.createUser = function () {
      if ($scope.user.password === $scope.passwordConfirm) {

        // transform the values in the checkboxes into values in the user roles array 
        if ($scope.roleBusinessAnalyst) {
          $scope.user.roles.push('BusinessAnalyst');
        }
        if ($scope.roleDataSteward) {
          $scope.user.roles.push('DataSteward');
        }
        if ($scope.roleAdmin) {
          $scope.user.roles.push('Admin');
        }
        
        // call function to create users in the backend
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
        alert('Password and Confirm password do not match!');
      }
    };

    /**
     * Function to initialize the scope.
     */
    function init() {
      // user information needed for the creation
      $scope.user = {
        nom: null,
        prenom: null,
        login: null,
        password: null,
        roles: []
      };
      // field used in the password confirmation
      $scope.passwordConfirm = '';
      // checkboxes to select the roles of the user
      $scope.roleBusinessAnalyst = false;
      $scope.roleDataSteward = false;
      $scope.roleAdmin = false;
    }
  });
