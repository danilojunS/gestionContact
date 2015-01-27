'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('ContactsCtrl', function ($scope, $wakanda) {

    $scope.contacts = $wakanda.$ds.Contact.$find({
      filter: 'nom = "*"'
    });

    // console.log($scope.contacts);

  });
