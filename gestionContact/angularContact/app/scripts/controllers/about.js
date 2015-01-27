'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('AboutCtrl', function ($scope, $wakanda) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log($wakanda.$currentUser());
        $wakanda.$currentUser().then(function (currentUser) {
            console.log('Current User :');
            console.log(currentUser);
          });
  });
