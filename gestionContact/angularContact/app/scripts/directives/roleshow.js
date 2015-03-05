'use strict';

/**
 * @ngdoc directive
 * @name gestionContactApp.directive:roleShow
 * @description
 * # roleShow
 */
angular.module('gestionContactApp')
  .directive('roleShow', function (authenticationService) {
    return {
      // template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.hide(); // element is normally hidden
        var roles = attrs.roleShow.replace(/\s+/g, '').split(','); // remove spaces of the string and transform it into an array
        // console.log(roles);
        if (authenticationService.isAuthorized(roles)) {
          element.show();
        }
      }
    };
  });
