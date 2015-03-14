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
