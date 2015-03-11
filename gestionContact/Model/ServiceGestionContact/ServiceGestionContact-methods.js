
model.ServiceGestionContact.methods.creerContact = function(nom, prenom) {
	
	var contact = new ds.Contact();
	contact.nom = nom;
	contact.prenom = prenom;
	
	var result = {
		result: false,
		message: "ERROR : Unknown"
	};
	
	try {
		contact.save();
		result.result = true;
		result.message = "Contact créé";
	} catch (e) {
		result.result = false;
		result.message = "ERROR : Contact pas créé";
	} finally {
		return result;
	}
	
};
model.ServiceGestionContact.methods.creerContact.scope = "public";


model.ServiceGestionContact.methods.supprimerContact = function(id) {
	
	var contact = ds.Contact.find("ID = " + id);
	
	var result = {
		result: false,
		message: "ERROR : Unknown"
	};
	
	try {
		contact.remove();
		result.result = true;
		result.message = "Contact supprimé";
	} catch (e) {
		result.result = false;
		result.message = "ERROR : Contact pas supprimé";
	} finally {
		return result;
	}
};
model.ServiceGestionContact.methods.supprimerContact.scope = "public";


model.ServiceGestionContact.methods.modifierContact = function(id, nom, prenom) {
	
	var contact = ds.Contact.find("ID = " + id);
	contact.nom = nom;
	contact.prenom = prenom;
	
	var result = {
		result: false,
		message: "ERROR : Unknown"
	};
	
	try {
		contact.save();
		result.result = true;
		result.message = "Contact modifié";
	} catch (e) {
		result.result = false;
		result.message = "ERROR : Contact pas modifié";
	} finally {
		return result;
	}
	
};
model.ServiceGestionContact.methods.modifierContact.scope = "public";
