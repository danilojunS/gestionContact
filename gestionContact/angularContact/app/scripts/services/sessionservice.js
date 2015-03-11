'use strict';

/**
 * @ngdoc service
 * @name gestionContactApp.sessionService
 * @description
 * # sessionService
 * Service in the gestionContactApp.
 */
angular.module('gestionContactApp')
  .service('sessionService', function () {
   
    var session = {};

    var id = null;
    var user = {
      id: null,
      name: null,
      roles: []
    };

    session.create = function (newSessionId, userId, userName, userRoles) {
      id = newSessionId;
      user.id = userId;
      user.name = userName;
      user.roles = userRoles;
    };

    session.destroy = function () {
      id = null;
      user.id = null;
      user.name = null;
      user.roles = [];
    };

    session.getUserId = function () {
      return user.id;
    };

    session.getUserName = function () {
      return user.name;
    };

    session.getUserRoles = function () {
      return user.roles;
    };

    return session;
  });
