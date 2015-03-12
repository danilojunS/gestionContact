

model.Contact.events.restrict = function(event) {
	var result = ds.Contact.createEntityCollection();
	
	var session = currentSession();
	
	if (session.belongsTo('Admin')) {
		result = ds.Contact.all();
	} else {
		var userID = session.storage.userID;
		result = ds.Contact.query("user.ID = "+userID);
	}
	
	return result;
};
