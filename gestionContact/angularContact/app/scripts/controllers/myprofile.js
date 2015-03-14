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

    // user information that is shown in the list of users
    $scope.user = {
      name: null,
      roles: null
    };

    // watch changes in the user name, data in the sessionService
    $scope.$watch(function () {
        return sessionService.getUserName();
      }, function(name) {
        $scope.user.name = name;
    });

    // watch changes in the user roles, data in the sessionService
    $scope.$watch(function () {
        return sessionService.getUserRoles();
      }, function(roles) {
        $scope.user.roles = roles;
    });

  });
