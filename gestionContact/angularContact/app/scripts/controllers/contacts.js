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

    // initialize the contact object in the scope
    resetNewContact();

    // list of contacts
    $scope.contacts = $wakanda.$ds.Contact.$find({});

    // functions
    $scope.removeContact = removeContact;
    $scope.editContact = editContact;
    $scope.addOrUpdateContact = addOrUpdateContact;

    /**
     * Function to reset the contact being created/modified.
     */
    function resetNewContact() {
      // put a contact object into the scope
      // this object represents the contact to be created/modified
      $scope.newContact = {
        ID: '',
        nom: '',
        prenom: ''
      };
    }

    /**
     * Function to remove a contact from the model.
     * It accesses the back-end, removes the contact and updates the list of contacts
     * in the front-end.
     * 
     * @param  {Object} contact to be removed
     */
    function removeContact(contact) {
      console.log('Suppression de contact.');
      $wakanda.$ds.ServiceGestionContact.supprimerContact(contact.ID).then(function (result) {
        console.log(result);
        // update contact list
        $scope.contacts = $wakanda.$ds.Contact.$find({});
      });
    }

    /**
     * Function to set the contact object that will be created/modified.
     * 
     * @param  {Object} contact to be created/modified
     */
    function editContact(contact) {
      $scope.newContact = { 
        ID: contact.ID,
        nom: contact.nom,
        prenom: contact.prenom
      };
    }

    /**
     * Function to create/modify a contact.
     */
    function addOrUpdateContact() {
      // only call this method if all fields are filled
      if($scope.newContact.nom !== '' && $scope.newContact.prenom !== '') {
          if ($scope.newContact.ID === '') {
            // there is no user ID, so it is a creation of contact
            console.log('Création de contact.');
            $wakanda.$ds.ServiceGestionContact.creerContact($scope.newContact.nom, $scope.newContact.prenom).then(function (result) {
              console.log(result);
              // update contact list
              $scope.contacts = $wakanda.$ds.Contact.$find({});
            });
          } else {
            // there is a user ID, so it is an update of a contact
            console.log('Mise à jour de contact.');
            $wakanda.$ds.ServiceGestionContact.modifierContact($scope.newContact.ID, $scope.newContact.nom, $scope.newContact.prenom).then(function (result) {
              console.log(result);
              // update contact list
              $scope.contacts = $wakanda.$ds.Contact.$find({});
            });
          }
      } else {
        alert('Remplir les deux champs : Nom et Prénom');
      }
      // reinitialize the contact object
      resetNewContact();
    }

  });
