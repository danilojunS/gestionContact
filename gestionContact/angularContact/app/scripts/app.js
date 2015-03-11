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
    admin: 'Admin',
    businessAnalyst: 'BusinessAnalyst',
    dataSteward: 'DataSteward'
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
        authorizedRoles: '*'      // it means that the user must be logged to see this page (all roles can see this page)
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
        controller: 'LoginCtrl',
        resolve: routeResolver
      })
      .when('/notAuthorized', {
        templateUrl: 'views/notauthorized.html',
        controller: 'NotauthorizedCtrl'
      })
      .when('/businessAnalyticsSpace', {
        templateUrl: 'views/businessanalyticsspace.html',
        controller: 'BusinessAnalyticsSpaceCtrl',
        authorizedRoles: [USER_ROLES.businessAnalyst]
      })
      .when('/dataStewardSpace', {
        templateUrl: 'views/datastewardspace.html',
        controller: 'DataStewardSpaceCtrl',
        authorizedRoles: [USER_ROLES.dataSteward]
      })
      .when('/commonSpace', {
        templateUrl: 'views/commonspace.html',
        controller: 'CommonSpaceCtrl',
        authorizedRoles: [USER_ROLES.businessAnalyst, USER_ROLES.dataSteward]
      })
      .when('/myProfile', {
        templateUrl: 'views/myprofile.html',
        controller: 'MyprofileCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        authorizedRoles: [USER_ROLES.admin],
        resolve: routeResolver
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
        if (authorizedRoles === '*') {
          if (!authenticationService.isAuthenticated()) {
            event.preventDefault();

            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            pathAfterLogin = next.originalPath;                     // save path that the user wants to access after the login
            $location.path('/login');                               // redirect user to login page

            console.log('user is not logged in');
          }
        } else if (!authenticationService.isAuthorized(authorizedRoles)) {

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
      var path = pathAfterLogin;
      pathAfterLogin = '/';
      $location.path(path);
    });

    // redirect to main page after logout
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      $location.path('/#');
    });

  });
