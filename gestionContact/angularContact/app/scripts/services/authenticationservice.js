'use strict';

/**
 * @ngdoc service
 * @name gestionContactApp.authenticationService
 * @description
 * # authenticationService
 * Service in the gestionContactApp.
 */
angular.module('gestionContactApp')
  .service('authenticationService', function ($http, $q, sessionService, $wakanda) {

    var authService = {};

    authService.login = function (credentials) {

      return $wakanda.$ds.ServiceAuthentication.login(credentials.email, credentials.password).then(function (response) {
        if (response.result.result === true) {
          console.log('Wakanda: login success');
            
          sessionService.create('', response.result.user.id, response.result.user.fullName, response.result.user.roles);
          
          return true;
         

        } else {

          console.log('Wakanda: login failed');
          return false;

        }
      });

      // return $wakanda.$loginByPassword(credentials.email, credentials.password).then(function (loginResult) {
      //   if (loginResult.result === true) {
          
      //     console.log('Wakanda: login success');
          
      //     // sessionService.create(res.data.id, res.data.user.id, res.data.user.role);
      //     // return res.data.user;
      //     return true;

      //   } else {
      //     console.log('Wakanda: login failed');
      //     return false;
      //   }
      // });
    };

    authService.logout = function () {
      
      return $wakanda.$ds.ServiceAuthentication.logout().then(function (result) {
        console.log(result.result);
        sessionService.destroy();
      });

      // return $wakanda.$logout().then(function() {
      //   sessionService.destroy();
      // });

    };

    authService.isAuthenticated = function () {
      return !!sessionService.getUserId();
    };

    authService.isAuthorized = function (authorizedRoles) {

      if (!authService.isAuthenticated ) {
        return false;
      }

      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      
      var userRoles = sessionService.getUserRoles();

      for (var i = 0; i < userRoles.length; i++) {
        if (authorizedRoles.indexOf(userRoles[i]) !== -1) {
          return true;
        }
      }

      return false;
      
    };

    return authService;
  });