'use strict';

/**
 * @ngdoc function
 * @name gestionContactApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the gestionContactApp
 */
angular.module('gestionContactApp')
  .controller('ContactsCtrl', function ($scope, $wakanda) {

    resetNewContact();

    $scope.contacts = $wakanda.$ds.Contact.$find({});

    $scope.removeContact = removeContact;
    $scope.editContact = editContact;
    $scope.addOrUpdateContact = addOrUpdateContact;

    // Functions implementation

    function resetNewContact() {
      $scope.newContact = {
        ID: '',
        nom: '',
        prenom: ''
      };
    }

    function removeContact(contact) {
      console.log('Suppression de contact.');
      $wakanda.$ds.ServiceGestionContact.supprimerContact(contact.ID).then(function (result) {
        console.log(result);
        $scope.contacts = $wakanda.$ds.Contact.$find({});
      });
    }

    function editContact(contact) {
      $scope.newContact = { 
        ID: contact.ID,
        nom: contact.nom,
        prenom: contact.prenom
      };
    }

    function addOrUpdateContact() {
      if($scope.newContact.nom !== '' && $scope.newContact.prenom !== '') {
          if ($scope.newContact.ID === '') {
            console.log('Création de contact.');
            $wakanda.$ds.ServiceGestionContact.creerContact($scope.newContact.nom, $scope.newContact.prenom).then(function (result) {
              console.log(result);
              $scope.contacts = $wakanda.$ds.Contact.$find({});
            });
          } else {
            console.log('Mise à jour de contact.');
            $wakanda.$ds.ServiceGestionContact.modifierContact($scope.newContact.ID, $scope.newContact.nom, $scope.newContact.prenom).then(function (result) {
              console.log(result);
              $scope.contacts = $wakanda.$ds.Contact.$find({});
            });
          }
      } else {
        alert('Remplir les deux champs : Nom et Prénom');
      }

      resetNewContact();
    }

  });
