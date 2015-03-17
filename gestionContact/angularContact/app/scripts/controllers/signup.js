'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('SignupCtrl', function ($scope) {
    // object that represents the user to be created
    // it is injected into the userForm directive
    $scope.user = {
      id: null,
      nom: null,
      prenom: null,
      login: null,
      password: null,
      roles: []
    };
    
  });
