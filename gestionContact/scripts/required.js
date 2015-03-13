function myLogin(userName, password) //simple login listener
{
	var theUser = directory.internalStore.User({name: userName});
	if (theUser != null) //user exists  in the directory
		return false; // allow directory authentication
	else
	{
		var theGroups = [];
		var userID = 0;
		if (password == 'a')
		{
			switch (userName){
				case 'John':
					theGroups = ['Admin'];
					userID = 100;
					break;
					
				case 'Paul':
					theGroups = ['Manager'];
					userID = 200;
					break;
					
				case 'Ringo':
					theGroups = ['Worker'];
					userID = 300;
					break;
			}	
		}
		if (userID != 0) {
			var user = {
				ID: userID, //UUID (converted if necessary)
				name: userName, //user login
				fullName: userName, //friendly display name
				belongsTo: theGroups
			}; //array of groups
			return user;
		} else
			return {error: 1024, errorMessage: 'Invalid Login'};
	}
};

function myLogin2(userName, password)
{
	var theUser = directory.internalStore.User({name: userName});
	if (theUser != null) //user exists  in the directory
		return false; // allow directory authentication
	else {
		var result = {error: 1024, errorMessage: 'InvalidLogin'};
		var contactDS = solution.getApplicationByName("gestionContact").ds;
		var theUser = contactDS.User({login:userName});
		if(theUser != null) {
			if(theUser.password === directory.computeHA1(userName,password) ) {
				
				var theGroups = theUser.roles.split(",");
				var putIntoStorage = {
					roles: theGroups,
					userID: theUser.ID
				};
				
				result = {
					ID: theUser.ID,
					name: theUser.login,
					fullName: theUser.nom + ' ' + theUser.prenom,
					belongsTo: theGroups,
					storage: putIntoStorage
				};
			}
		}
		return result;
	}
}
					
