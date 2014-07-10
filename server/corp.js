var authAgainstCorp = function(cookie) {
    // Attempts to authenticate the current user cookie
    // against corp, returns a string of the router path.

    if (Meteor.user()) {
        // If someone is already logged in.
        return;
    }

    // TODO check if cookie
    var hasCorpToken = false;
    if (!hasCorpToken) {
        // TODO
        return;
    }

    // TODO parse the cookie
    var username = "foo";
    var token = "bar";

    // TODO is token in cookie valid?
    var isValidToken = false;
    if (!isValidToken) {
        // TODO
        return;
    }

    var isNewUser = false;
    if (!isNewUser) {
        // TODO
        return;
    }

    // TODO create new user
    Accounts.createUser(
        username: username,
        email: username,
        password: 'notapplicable'
    }, function(err) {
        if (err) {
            console.log(err);
            return '/user-error';
        } else {
            return '/account';
        }
    });
};
