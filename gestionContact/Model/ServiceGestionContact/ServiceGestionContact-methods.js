

model.ServiceGestionContact.methods.creerContact = function(pNom, pPrenom) {
	// Add your code here;
	var currentContact = new ds.Contact();
	currentContact.nom = pNom;
	currentContact.prenom = pPrenom;
	currentContact.save();
};
model.ServiceGestionContact.methods.creerContact.scope = "public";
