﻿

//loginByPassword("Jane","a");

//ds.Contact.all();

//ds.ServiceGestionContact.creerContact("John", "Wick");
//ds.ServiceGestionContact.supprimerContact(4);
//ds.ServiceGestionContact.modifierContact(5, "Mary", "Jane");


//var contact = ds.Contact.find("ID = " + 8);
//contact.remove();

var contact = new ds.Contact();
contact.nom = "Mary";
contact.prenom = "Mary";
contact.save();

//var arrStop = getUserSessions();
//arrStop.forEach(function(item) {
//    item.forceExpire();
//});

//getUserSessions();