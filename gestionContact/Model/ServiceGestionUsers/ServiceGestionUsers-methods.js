



model.ServiceGestionUsers.methods.createUser = function(infos) {
	
	var user = new ds.User();

	user.nom = infos.nom;
	user.prenom = infos.prenom;
	user.login = infos.login;
	user.password = directory.computeHA1(user.login, infos.password);
	user.roles = infos.roles.join(",");

	
	var result = {
		result: false,
		message: "ERROR : Unknown"
	};
	
	try {
		user.save();
		result.result = true;
		result.message = "User created";
	} catch (e) {
		result.result = false;
		result.message = "ERROR : User not created";
	} finally {
		return result;
	}
	
};

model.ServiceGestionUsers.methods.createUser.scope = "public";

model.ServiceGestionUsers.methods.deleteUser = function(id) {

	var user = ds.Contact.find("ID = " + id);
		
		var result = {
			result: false,
			message: "ERROR : User Unknown"
		};
		
		try {
			user.remove();
			result.result = true;
			result.message = "User deleted";
		} catch (e) {
			result.result = false;
			result.message = "ERROR trying to delete User";
		} finally {
			return result;
		}
}

model.ServiceGestionUsers.methods.deleteUser.scope = "public";


model.ServiceGestionUsers.methods.modifyUser = function(infos) {
	
	var  user = ds.Contact.find("ID = " + infos.id);

	for(var key in infos) {
		user[key] = infos[key];
	}
	
	var result = {
		result: false,
		message: "ERROR : Unknown"
	};
	
	try {
		user.save();
		result.result = true;
		result.message = "User modified";
	} catch (e) {
		result.result = false;
		result.message = "ERROR : Contact not modified";
	} finally {
		return result;
	}
	
};
model.ServiceGestionUsers.methods.modifyUser.scope = "public";
