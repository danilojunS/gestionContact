
model.ServiceAuthentication.methods.login = function(username, password) {
	// result in case of error
	var res = {
		result: false,
		message: "ERROR : Login failed"
	};
	
	// see if the user is already logged in
	// if yes, logout from all sessions
	// this is done to prevent multiple sessions of the same user
	var sessions = getUserSessions(username);
	sessions.forEach(function (session) {
		session.forceExpire();
	});
	
	// call standard login method from Wakanda
	if (loginByPassword(username, password, 60*60)) {
		// the result has now the user information
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
