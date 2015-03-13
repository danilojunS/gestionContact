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
    
    $scope.users = $wakanda.$ds.User.$find({});


    $scope.deleteUser = function (user) {
      console.log('Suppression d utilisateur.');
      $wakanda.$ds.ServiceGestionUsers.deleteUser(user.ID).then(function (result) {
        console.log(result);
        $scope.users = $wakanda.$ds.User.$find({});
      });
        
    };

  });
