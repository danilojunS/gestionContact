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
  })
  .constant('USER_ROLES', {
    // Liste des roles proosibles pour un User
    loggedUser: 'LoggedUser',    // role existant dans le front pour spécifier qu'une vue est visible par tous les roles, mais il faut être logué
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
        authorizedRoles: [USER_ROLES.loggedUser]      
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        resolve: routeResolver,
        authorizedRoles: [USER_ROLES.loggedUser]
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
  .run(function ($route, $rootScope, $location, AUTH_EVENTS, authenticationService, USER_ROLES, $window) {

    // USER_ROLES peut être accédé partout dans l'application
    $rootScope.USER_ROLES = USER_ROLES;

    // variable pour garder le chemin vers lequel l'utilisateur sera dirigé après le login
    // par défaut, diriger l'utilisateur à la page principale
    var pathAfterLogin = '/'; 

    // observer les transitions des routes
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      // objet next contient les roles autorisés, spécifiés dans les routes
      var authorizedRoles = next.authorizedRoles;

      if (authorizedRoles) {
        if (!authenticationService.isAuthorized(authorizedRoles)) {
          // si l'utilisateur n'est pas autorisé
          // découvrir la raison
          event.preventDefault();

          if (authenticationService.isAuthenticated()) {
            // l'utilisateur est identifié, mais n'a pas droit d'accéder à la vue
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            $location.path('/notAuthorized');                       // aller à la page d'erreur

            console.log('user is not allowed');

          } else {
            // l'utilisateur n'est même pas logué
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            // sauvegarder le chemin vers lequel l'utilisateur voulais être dirigé
            pathAfterLogin = next.originalPath;                     
            $location.path('/login');                               // aller à la page de login

            console.log('user is not logged in');
          }
        }
      }

    });

    // capter les évenements de login
    // loginSuccess
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
      // pathAfterLogin contient le chemin vers lequel l'utilisateur voulais être dirigé après le login
      var path = pathAfterLogin;
      pathAfterLogin = '/'; // reset du chemin
      $location.path(path); // diriger l'utilisateur à la vue qu'il voulais aller
    });

    // logoutSuccess
    // aller à la page principale après le logout
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      $location.path('/#');
    });

    // traiter le rafraichissement de la page
    $window.onbeforeunload = function () {
      // garder le chemin actuel dans la sessionStorage
      // sessionStorage est maintenu, même après le login
      $window.sessionStorage.setItem('path', $location.path());
    };

    // vérifier si l'utilisateur est déjà logué, en observant la valeur de son cookie
    // cette méthode permet de persister la connection d'utilisateur quand il rafraichit la page
    authenticationService.verifyCookies().then(function (hasCookie) {
      // si l'utilisateur est déjà logué (il y a un cookie valide)
      if (hasCookie) {
        // diriger l'utilisateur à la page où il était avant le rafraichissement de la page
        $location.path($window.sessionStorage.getItem('path'));
      }
    });

  });
