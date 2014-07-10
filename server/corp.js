Meteor.methods({
    authAgainstCorp: function (cookie) {
    // Since we are behind corp secure, if there
    // is an auth_user cookie, we can assume that user
    // is logged into corp.

    if (Meteor.user()) {
        // Someone is already logged in.
        return;
    }

    // Check if cookie from corp exists.
    // Get the username and unescape it from the cookie.
    var username = cookie;
    if (!username) {
        // There is no cookie!
        return;
    }

    console.log(username);

    // Check if this user exists in Meteor.
    var user = Meteor.users.findOne({username: username});
    if (user) {
        // User exists in Meteor.
        console.log("", user);
        return;
    }

    // User doesn't exist. Create and login.
    Accounts.createUser({
        username: username,
        email: username,
        password: 'secret'
    });
}});