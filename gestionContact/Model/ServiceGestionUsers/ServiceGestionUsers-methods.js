


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
	
	if(ds.User.find("login = " + user.login) !== null) {
		result.message = "ERROR : Login already taken";
		result.loginTaken = true;
		return result;
	}
	
	try {
		user.save();
		result.result = true;
		result.message = "User created";
	} catch (e) {
		result.result = false;
		result.message = "ERROR : User not created";
		result.e = e;
	} finally {
		return result;
	}
	
};

model.ServiceGestionUsers.methods.createUser.scope = "public";

model.ServiceGestionUsers.methods.deleteUser = function(id) {

	var user = ds.User.find("ID = " + id);
		
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
	
	var  user = ds.User.find("ID = " + infos.id);

	user.nom = infos.nom;
	user.prenom = infos.prenom;
	if (user.password != infos.password) {
		// only change the password if it has changed
		// if we dont test this condition, the user password will be overwritten each time
		// and the hash will be calculated over another hash, which will set the wrong password
		// to the user
		user.password = directory.computeHA1(user.login, infos.password);
	}
	user.roles = infos.roles.join(",");

	
	var result = {
		result: false,
		message: "ERROR : Unknown"
	};
	
	if(user.login != infos.login && ds.User.find("login = " + infos.login) !== null) {
		result.message = "ERROR : Login already taken";
		result.loginTaken = true;
		return result;
	}
	
	// can use the login
	user.login = infos.login;

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
