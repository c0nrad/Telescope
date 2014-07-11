// Session variables
Session.set('initialLoad', true);
Session.set('today', new Date());
Session.set('view', 'top');
Session.set('postsLimit', getSetting('postsPerPage', 10));
Session.set('sessionId', Meteor.default_connection._lastSessionId);

STATUS_PENDING=1;
STATUS_APPROVED=2;
STATUS_REJECTED=3;

navItems.push('adminMenu');

viewNav = viewNav.concat([
  {
    route: 'posts_top',
    label: 'Top'
  },
  {
    route: 'posts_new',
    label: 'New'
  },
  {
    route: 'posts_best',
    label: 'Best'
  },
  {
    route: 'posts_digest',
    label: 'Digest'
  }   
]);

adminNav = adminNav.concat([
  {
    route: 'posts_pending',
    label: 'Pending'
  },
  {
    route: 'all-users',
    label: 'Users'
  },
  {
    route: 'settings',
    label: 'Settings'
  },
  {
    route: 'toolbox',
    label: 'Toolbox'
  }   
]);

Accounts.config({
  forbidClientAccountCreation: true
});

// Notifications - only load if user is logged in
// Not mandatory, because server won't publish anything even if we try to load.
// Remember about Deps.autorun - user can log in and log out several times
Deps.autorun(function() {
  // userId() can be changed before user(), because loading profile takes time
  if (Meteor.userId()) {
    Meteor.subscribe('notifications');
  } else {
    Meteor.call('findOrCreateUser', Cookie.get("auth_user"), function(err, token) {
      if (err) { console.log(err); }
      if (token) {
        Accounts.callLoginMethod({
          methodArguments: [{username: Cookie.get("auth_user"), token: token}],
          userCallback: function(err) { if (err) { console.log(err); } else { console.log("login successful!"); }}
        });
      }
    });
  }
});


// Sort postModules array position using modulePositions as index
postModules = _.sortBy(postModules, function(module){return _.indexOf(modulePositions, module.position)});
