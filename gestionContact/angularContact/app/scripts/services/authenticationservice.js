'use strict';

/**
 * @ngdoc service
 * @name gestionContactApp.authenticationService
 * @description
 * # authenticationService
 * Service in the gestionContactApp.
 * It contains all methods related to the authentication of the user.
 */
angular.module('gestionContactApp')
  .service('authenticationService', function (sessionService, $wakanda, USER_ROLES) {

    var authService = {};

    /**
     * Method of login.
     * 
     * @param  {{username: string, password: string}}   credentials of the user (username, password)
     * @return {Object}   promise that returns true if the login was successful
     */
    authService.login = function (credentials) {
      // call back-end method of login
      return $wakanda.$ds.ServiceAuthentication.login(credentials.email, credentials.password).then(function (response) {
        if (response.result.result === true) {
          console.log('Wakanda: login success');
          // create session in the client
          sessionService.create('', response.result.user.id, response.result.user.fullName, response.result.user.roles);
          
          return true;
         

        } else {

          console.log('Wakanda: login failed');
          return false;

        }
      });

      /*
      // alternative: use native methods of the $wakanda service
      // We do not use it because we extend the login functionality in the back-end, with the 
      // ServiceAuthentication dataclass
      
      return $wakanda.$loginByPassword(credentials.email, credentials.password).then(function (loginResult) {
        if (loginResult.result === true) {
          
          console.log('Wakanda: login success');
          
          // sessionService.create(res.data.id, res.data.user.id, res.data.user.role);
          // return res.data.user;
          return true;

        } else {
          console.log('Wakanda: login failed');
          return false;
        }
      });
      */
    };

    /**
     * Method of logout.
     * 
     * @return {Object} Promise with the result of the operation.
     */
    authService.logout = function () {
      
      return $wakanda.$ds.ServiceAuthentication.logout().then(function () {

        console.log('Wakanda: logout success');
        // destroy the current client session
        sessionService.destroy();
      });

      /*
      // alternative: use native methods of the $wakanda service

      return $wakanda.$logout().then(function() {
        sessionService.destroy();
      });
      */

    };

    /**
     * Method that verifies the cookies of the user.
     * If there is a valid cookie, it means that the user already has a seesion
     * in the back-end, so we just need to recover it
     *
     * @return {Object} Promise that returns true if the user already has a session in the back-end
     */
    authService.verifyCookies = function () {
      // first, initialize wakanda
      return $wakanda.init().then(function () {
        // then, verify if ther is a user related to the cookie
        return $wakanda.$ds.ServiceAuthentication.getCurrentUser().then(function (response) {
          if (response.result.result !== false) {
            // there is a session in the back-end
            // so just create a session in the client with the user information
            sessionService.create('', response.result.id, response.result.fullName, response.result.roles); 
            return true;
          }
          return false;
        });
      });
    };

    /**
     * Method to verify if the user is authenticated.
     * 
     * @return {Boolean}  true if the user is authenticated
     */
    authService.isAuthenticated = function () {
      return !!sessionService.getUserId();
    };

    /**
     * Method to verify if the user is authorized to access a view/information.
     
     * @param  {Array.String} array of the authorized roles
     * @return {Boolean}      true if the user is authorized.
     */
    authService.isAuthorized = function (authorizedRoles) {
      // returns false if the user is not authenticated (not logged in)
      if (!authService.isAuthenticated()) {
        return false;
      }

      // transforms the input into an array if it is not an array
      // this is done to allows the user to insert a simple string
      // to the authorizedRoles, if there is only one authorized role
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      // if the authorizedRole is USER_Roles.loggedUser, allows the access
      // USER_ROLES.loggedUser is the role that represents the fact
      // that the user must be logged to see the content, but she can have 
      // any role. That is, USER_ROLES.loggedUser states that all roles
      // can access the content.
      if (authorizedRoles.indexOf(USER_ROLES.loggedUser) !== -1) {
        return authService.isAuthenticated();
      }

      // get the roles of the current user
      var userRoles = sessionService.getUserRoles();

      // if the user is an admin, let access
      if (userRoles.indexOf(USER_ROLES.admin) !== -1) {
        return true;
      }

      // verify if the user has the required roles to access the content
      for (var i = 0; i < userRoles.length; i++) {
        if (authorizedRoles.indexOf(userRoles[i]) !== -1) {
          return true;
        }
      }

      // otherwise, user has not rights to see the content
      return false;
      
    };

    return authService;
  });