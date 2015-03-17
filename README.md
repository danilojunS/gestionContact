# gestionContact

This is an application developed with AngularJs and Wakanda, intended to show the implementation of a user management system in Single-Page Applications. It has functionalities of creating/modifying/deleting users and controlling what each user can see/do in the application based on roles.

The AngularJS part was inspired on the online tutorial made by Gert Hengeveld, available at [Techniques for authentication in AngularJS applications](https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec "Techniques for authentication in AngularJS applications").

## Installing the app

### Node.js and npm

First, be sure to have Node.js installed in your computer. Download it at [nodejs.org](https://nodejs.org/ "Node.js").
It comes with the npm package manager, that will be used to install all the front-end components of the application.

### Yeoman, Bower and Grunt

Install Yeoman, Bower and Grunt using the command:

    npm install -g yo bower grunt-cli

For more details of this step, please visit [yeoman.io](http://yeoman.io/learning/index.html "Yeoman").

### Wakanda

Installed Wakanda Server and Wakanda Studio. They are both available at [wakanda.org](http://www.wakanda.org/downloads?qt-downloadse=0#qt-downloadse "wakanda.org").

### Getting the application gestionContact

Get the project:
    
    git clone https://github.com/danilojunS/gestionContact.git

Go to the folder gestionContact/angularContact.

Install Node dependencies:

    npm install

Install Bower dependencies:

    bower install

Initialize the application:

    grunt initConfig

Congratulations! Now you can run the application!

## Running the app

First, start Wakanda Studio and open the Solution of the application.
Then, start the Solution clicking the "Start Solution" at the top of the studio.

Finally, go to the folder gestionContact/angularContact and start the app:

    grunt serve

This will automatically open a window in your default browser with the application.