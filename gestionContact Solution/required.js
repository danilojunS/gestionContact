function myLogin(userName, password) //simple login listener
{
	if (userName == 'Admin')
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