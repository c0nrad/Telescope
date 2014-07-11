var querystring = Npm.require('querystring');

var generateToken = function (username) {
    console.log("got to generateToken");
    return "xxx";
}

Meteor.methods({
    findOrCreateUser: function (cookie) {
    // Since we are behind corp secure, if there
    // is an auth_user cookie, we can assume that user
    // is logged into corp.

    // Check if cookie from corp exists.
    if (!cookie) {
        // There is no cookie!
        console.log("Got to findOrCreateUser without an auth_user cookie")
        console.log("Something very wrong has happened")
        return;
    }

    // Get the username and unescape it from the cookie.
    var username = querystring.unescape(cookie);

    // Check if this user exists in Meteor.
    if (Meteor.users.findOne({username: username})) {  
        return generateToken(username);
    }

    // User doesn't exist. Create and login.
    var userId = Accounts.createUser({
        username: username,
        email: username
    });
    
    return generateToken(Meteor.users.findOne(userId).username);
}});