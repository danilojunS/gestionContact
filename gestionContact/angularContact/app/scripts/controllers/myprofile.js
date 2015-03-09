'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:MyprofileCtrl
 * @description
 * # MyprofileCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('MyprofileCtrl', function ($scope, sessionService) {
    $scope.user = {
      name: null,
      role: null
    };

    $scope.$watch(function () {
        return sessionService.getUserName();
      }, function(name) {
        $scope.user.name = name;
    });

    $scope.$watch(function () {
        return sessionService.getUserRole();
      }, function(role) {
        $scope.user.role = role;
    });

  });
