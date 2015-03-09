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

  });
