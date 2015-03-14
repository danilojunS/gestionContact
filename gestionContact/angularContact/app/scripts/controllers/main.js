'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('MainCtrl', function ($scope, sessionService) {
    // user name, got from the sessionService
    $scope.userName = sessionService.getUserName();
  });
