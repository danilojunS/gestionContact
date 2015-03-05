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
      role: null
    };

    session.create = function (newSessionId, userId, userName, userRole) {
      id = newSessionId;
      user.id = userId;
      user.name = userName;
      user.role = userRole;
    };

    session.destroy = function () {
      id = null;
      user.id = null;
      user.name = null;
      user.role = null;
    };

    session.getUserId = function () {
      return user.id;
    };

    session.getUserName = function () {
      return user.name;
    };

    session.getUserRole = function () {
      return user.role;
    };

    return session;
  });
