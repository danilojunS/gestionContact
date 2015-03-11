
model.ServiceAuthentication.methods.login = function(username, password) {
	var res = {
		result: false,
		message: "ERROR : Login failed"
	};
	
	if (loginByPassword(username, password, 60*60)) {
		
		var res = {
			result: true,
			message: "Login success",
			user: model.ServiceAuthentication.methods.getCurrentUser()
		};
	}
	
	return res;
};
model.ServiceAuthentication.methods.login.scope = "public";

model.ServiceAuthentication.methods.getCurrentUser = function() {
	
	var res = {
		result: false,
		message: "ERROR : getCurrentUser failed"
	};
	
	var theCurrentUser = currentUser();
	
	var theUser = directory.internalStore.User({name: theCurrentUser.name});
	if (theUser != null) {
		// user exists in directory
		
		var roles = [];
		theCurrentUser.getParents().forEach(function (role) {
			roles.push(role.name);
		});
		
		res = {
			id: theCurrentUser.ID,
			fullName: theCurrentUser.fullName,
			roles: roles
		};
	} else {
		theUser = ds.User({login:theCurrentUser.name});
		if (theUser != null) {
			// user exists in dataclass User
			res = {
				id: theCurrentUser.ID,
				fullName: theCurrentUser.fullName,
				roles: theUser.roles.split(",")
			};
		} 
	}
	
	return res;
};
model.ServiceAuthentication.methods.getCurrentUser.scope = "public";

model.ServiceAuthentication.methods.logout = function() {
	return logout();
};
model.ServiceAuthentication.methods.logout.scope = "public";
