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
    // Liste de constantes correspondant à des évennements liés à l'authentification
    loginSuccess: 'auth-login-success',             // Réussite du login
    loginError: 'auth-login-error',                 // Erreur pendant le process
    loginFailed: 'auth-login-failed',               // Echec du login
    logoutSuccess: 'auth-logout-success',           // Réussite du logout
    sessionTimeout: 'auth-session-timeout',         // Timeout atteint
    notAuthenticated: 'auth-not-authenticated',     // Utilisateur non authentifié
    notAuthorized: 'auth-not-authorized',           // Utilisateur non habilité
    hasCookie: 'auth-has-cookie'                    // Utilisateur détient lecookie d'authent
  })
  .constant('USER_ROLES', {
    // Liste des roles proosibles pour un User
    admin: 'Admin',
    businessAnalyst: 'BusinessAnalyst',
    dataSteward: 'DataSteward'
  })
  .config(function ($routeProvider, USER_ROLES) {

    // Initialisation du service Wakanda
    var routeResolver = {
      app: ['$wakanda', function($wakanda) {
          return $wakanda.init();
        }]
    };

    // L'option authorizedRoles permet d'effectuer le contrôle de l'habilitation à la demande de chargement d'une page
    // Si il n'est pas renseigné, l'accès est autorisé à tout le monde
    // On peut y passer un tableau de roles 
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        authorizedRoles: '*'      
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        resolve: routeResolver,
        authorizedRoles: '*'
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
      .when('/businessAnalystSpace', {
        templateUrl: 'views/businessanalystspace.html',
        controller: 'BusinessAnalystSpaceCtrl',
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
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
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
      var path = pathAfterLogin;
      pathAfterLogin = '/';
      $location.path(path);
    });

    // redirect to main page after logout
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      $location.path('/#');
    });

    // has cookie with session, only refresh page
    $rootScope.$on(AUTH_EVENTS.hasCookie, function () {
      var path = pathAfterLogin;
      pathAfterLogin = '/';
      $location.path(path);
    });

    authenticationService.verifyCookies();

  });
