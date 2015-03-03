'use strict';

/**
 * @ngdoc overview
 * @name gestionContactApp
 * @description
 * # gestionContactApp
 *
 * Main module of the application.
 */
angular
  .module('gestionContactApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'wakanda'
  ])
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginError: 'auth-login-error',                 // some error in login process
    loginFailed: 'auth-login-failed',               // invalid name or password
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    admin: 'admin',
    businessAnalytics: 'user-business-analytics',
    dataSteward: 'user-data-steward'
  })
  .config(function ($routeProvider, USER_ROLES) {

    var routeResolver = {
      app: ['$wakanda', function($wakanda) {
          return $wakanda.init();
        }]
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        authorizedRoles: [USER_ROLES.businessAnalytics]
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        resolve: routeResolver
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
        //resolve: routeResolver
      })
      .when('/notAuthorized', {
        templateUrl: 'views/notauthorized.html',
        controller: 'NotauthorizedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($route, $rootScope, $location, AUTH_EVENTS, authenticationService) {

    var pathAfterLogin = '/';  // path to where redirect the user after the login

    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      var authorizedRoles = next.authorizedRoles;

      if (authorizedRoles) {
        if (!authenticationService.isAuthorized(authorizedRoles)) {
          
          event.preventDefault();

          if (authenticationService.isAuthenticated()) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            $location.path('/notAuthorized');                       // redirect user to error page

            console.log('user is not allowed');

          } else {
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            pathAfterLogin = next.originalPath;                     // save path that the user wants to access after the login
            $location.path('/login');                               // redirect user to login page

            console.log('user is not logged in');
          }
        }
      }

    });

    // redirect to page after login
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
      $location.path(pathAfterLogin);
      pathAfterLogin = '/';
    });

    // redirect to main page after logout
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      $location.path('/');
    });

  });
