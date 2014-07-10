var authAgainstCorp = function(cookie) {
    // Since we are behind corp secure, if there
    // is an auth_user cookie, we can assume that user
    // is logged into corp.

    if (Meteor.user()) {
        // Someone is already logged in.
        return '/';
    }

    // Check if cookie from corp exists.
    // Get the username and unescape it from the cookie.
    var username = Cookie.get('auth_user', function(s) {
        return querystring.unescape(s);
    });
    if (!username) {
        // There is no cookie!
        return 'https://corp.10gen.com';
    }

    // Check if this user exists in Meteor.
    var user = Meteor.users.findOne({username: username});
    if (user) {
        // User exists in Meteor.
        return '/';
    }

    Accounts.createUser({
        username: username,
        email: username,
        password: 'notapplicable'
    }, function(err) {
        if (err) {
            console.log(err);
            return '/user-error';
        } else {
            return '/';
        }
    });

    return '/account';
};
