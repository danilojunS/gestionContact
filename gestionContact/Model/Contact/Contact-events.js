

model.Contact.events.restrict = function(event) {
	var result = ds.Contact.createEntityCollection();
	
	var session = currentSession();
	var userID = session.storage.userID;
	result = ds.Contact.query("user.ID = "+userID);
	
	return result;
};
