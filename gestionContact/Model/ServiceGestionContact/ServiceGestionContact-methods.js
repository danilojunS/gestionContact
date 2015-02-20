importScripts("libs/promise-6.1.0.min.js");

model.ServiceGestionContact.methods.creerContact = function(nom, prenom) {
	
	return new Promise(function (resolve, reject) {
		var contact = new ds.Contact();
		contact.nom = nom;
		contact.prenom = prenom;
		
		try {
			contact.save();
			resolve("Contact created successfully.");
		} catch (e) {
			reject("Cannot create contact: "+ e.message);
		}
	});
	
};
model.ServiceGestionContact.methods.creerContact.scope = "public";


model.ServiceGestionContact.methods.supprimerContact = function(id, callback) {
	return new Promise(function (resolve, reject) {
		var contact = ds.Contact.find("ID = " + id);
	
		try {
			contact.remove();
			resolve("Contact removed successfully.");
		} catch (e) {
			reject("Cannot remove contact: "+ e.message);
		}
	});
};
model.ServiceGestionContact.methods.supprimerContact.scope = "public";


model.ServiceGestionContact.methods.modifierContact = function(id, nom, prenom, callback) {
	
	return new Promise(function (resolve, reject) {
		var contact = ds.Contact.find("ID = " + id);
		contact.nom = nom;
		contact.prenom = prenom;
		
		try {
			contact.save();
			resolve("Contact modified successfully.");
		} catch (e) {
			reject("Cannot modify contact: "+ e.message);
		}
	});
	
};
model.ServiceGestionContact.methods.modifierContact.scope = "public";
