'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('UsersCtrl', function ($scope, $wakanda) {
    // list of users
    $scope.users = $wakanda.$ds.User.$find({});

    // user being created/updated
    $scope.user = {
      id: null,
      nom: null,
      prenom: null,
      login: null,
      password: null,
      roles: []
    };

    // watch to update the user list each time an operation of
    // creation/modification is executed
    $scope.$watch('user', function () {
      $scope.users = $wakanda.$ds.User.$find({});
    });

    /**
     * Function to set the user to be edited
     * 
     * @param  {Object} user to be edited
     */
    $scope.editUser = function (user) {
      console.log('Édition d utilisateur.');
      // put the user information to be edited into the scope
      $scope.user = {
        id: user.ID,
        nom: user.nom,
        prenom: user.prenom,
        login: user.login,
        password: user.password,
        roles: user.roles.split(',')
      };
      // this user information is then charged automatically
      // into the directive userForm, because we injected
      // the user into the scope of the directive
    };

    /**
     * Function to delete a user from the back-end
     * 
     * @param  {Object} user to be deleted
     */
    $scope.deleteUser = function (user) {
      console.log('Suppression d utilisateur.');
      // call method of the backend to delete the user, passing her ID
      $wakanda.$ds.ServiceGestionUsers.deleteUser(user.ID).then(function (result) {
        console.log(result);
        // update user list
        $scope.users = $wakanda.$ds.User.$find({});
      });
        
    };

  });
