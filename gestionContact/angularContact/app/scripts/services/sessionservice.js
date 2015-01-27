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
    var userId = null;
    var userRole = null;

    session.create = function (newSessionId, newUserId, newUserRole) {
      id = newSessionId;
      userId = newUserId;
      userRole = newUserRole;
    };

    session.destroy = function () {
      id = null;
      userId = null;
      userRole = null;
    };

    session.getUserId = function () {
      return userId;
    };

    session.getUserRole = function () {
      return userRole;
    };

    return session;
  });
