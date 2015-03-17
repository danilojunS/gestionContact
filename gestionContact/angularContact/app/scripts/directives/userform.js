'use strict';

/**
 * @ngdoc directive
 * @name gestionContactApp.directive:userForm
 * @description
 * # userForm
 * Directive used to create/modify a user
 */
angular.module('gestionContactApp')
  .directive('userForm', function ($wakanda) {
    return {
      templateUrl: 'views/userform.html',
      restrict: 'E',
      scope: {
        user: '=user'
      },
      link: function postLink(scope) {
        // initialize scope
        init();

        // watches for changes in th user id to update the form data
        scope.$watch('user.id', function (userId) {
          if (userId) {
            // it is a modification of a user
            scope.buttonText = 'Modify information';
            // copy the password into the confirm password field
            scope.passwordConfirm = scope.user.password;

            // transform the values in the user roles array into values in the checkboxes
            if (scope.user.roles.indexOf('BusinessAnalyst') !== -1) {
              scope.roleBusinessAnalyst = true;
            } else {
              scope.roleBusinessAnalyst = false;
            }
            if (scope.user.roles.indexOf('DataSteward') !== -1) {
              scope.roleDataSteward = true;
            } else {
              scope.roleDataSteward = false;
            }
            if (scope.user.roles.indexOf('Admin') !== -1) {
              scope.roleAdmin = true;
            } else {
              scope.roleAdmin = false;
            }

          } else {
            // otherwise, it is a user creation
            scope.buttonText = 'Create account';
          }
        });
        

        /**
         * Function to create/update a user.
         * If there is no user ID in the user object in the scope, it creates a new user
         * Else, it modifies the user record using the user id
         * It accesses the back-end, creates/modify the user and returns the result of the operation.
         */
        scope.createOrUpdateUser = function () {
          if (scope.user.password === scope.passwordConfirm) {

            // reinitialize array or roles;
            scope.user.roles = [];

            // transform the values in the checkboxes into values in the user roles array 
            if (scope.roleBusinessAnalyst) {
              scope.user.roles.push('BusinessAnalyst');
            }
            if (scope.roleDataSteward) {
              scope.user.roles.push('DataSteward');
            }
            if (scope.roleAdmin) {
              scope.user.roles.push('Admin');
            }
            
            if (!scope.user.id) {
              // call function to create users in the backend
              $wakanda.$ds.ServiceGestionUsers.createUser(scope.user).then(function (result) {
                if (result.result.result) {
                  alert('User created!');
                  init();
                } else {
                  if(result.result.loginTaken) {
                    alert('Login already taken!');
                  } else {
                    alert('User not created!');
                  }
                }
              });
            } else {
              // call function to modify users in the backend
              $wakanda.$ds.ServiceGestionUsers.modifyUser(scope.user).then(function (result) {
                if (result.result.result) {
                  alert('User modified!');
                  init();
                } else {
                  if(result.result.loginTaken) {
                    alert('Login already taken!');
                  } else {
                    alert('User not created!');
                  }
                }
              });
            }
            
            
          } else {
            alert('Password and Confirm password do not match!');
          }
        };

        /**
         * Function to initialize the scope.
         */
        function init() {
          // user information needed for the creation
          scope.user = {
            id: null,
            nom: null,
            prenom: null,
            login: null,
            password: null,
            roles: []
          };
          // field used in the password confirmation
          scope.passwordConfirm = '';
          // checkboxes to select the roles of the user
          scope.roleBusinessAnalyst = false;
          scope.roleDataSteward = false;
          scope.roleAdmin = false;
        }
      }
    };
  });
