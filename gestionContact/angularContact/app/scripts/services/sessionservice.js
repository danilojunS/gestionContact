'use strict';

/**
 * @ngdoc service
 * @name gestionContactApp.sessionService
 * @description
 * # sessionService
 * Service in the gestionContactApp.
 * It is used to store all the current user information.
 */
angular.module('gestionContactApp')
  .service('sessionService', function () {
   
    var session = {};

    // id of the section
    var id = null;

    // user information needed in the front-end
    var user = {
      id: null,
      name: null,
      roles: []
    };

    /**
     * Method used to create a session.
     * 
     * @param  {String}       ID of the session
     * @param  {String}       ID of the user
     * @param  {String}       Full name of the user
     * @param  {Array.String} User Roles
     */
    session.create = function (newSessionId, userId, userName, userRoles) {
      id = newSessionId;
      user.id = userId;
      user.name = userName;
      user.roles = userRoles;
    };

    /**
     * Method that destroys the current session in the front-end.
     * It is called when the user performs a logout from the app.
     */
    session.destroy = function () {
      id = null;
      user.id = null;
      user.name = null;
      user.roles = [];
    };

    /**
     * Getter of user ID.
     * @return {String} User ID
     */
    session.getUserId = function () {
      return user.id;
    };

    /**
     * Getter of user full name.
     * @return {String} User full name
     */
    session.getUserName = function () {
      return user.name;
    };

    /**
     * Getter of user roles.
     * @return {Array.String} User roles
     */
    session.getUserRoles = function () {
      return user.roles;
    };

    return session;
  });
