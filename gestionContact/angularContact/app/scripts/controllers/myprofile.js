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
      roles: null
    };

    $scope.$watch(function () {
        return sessionService.getUserName();
      }, function(name) {
        $scope.user.name = name;
    });

    $scope.$watch(function () {
        return sessionService.getUserRoles();
      }, function(roles) {
        $scope.user.roles = roles;
    });

  });
