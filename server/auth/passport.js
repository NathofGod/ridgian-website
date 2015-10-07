

var passport = require('passport');

module.exports.getPassport = function(config, oauth, User) {

    // hook to serialize in-memory user to session cookie
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // hook to deserialize session cookie to in-memory user (pulled from mongo)
    passport.deserializeUser(function(user, done) {
        // User.findById(id, function(err, user) {
            // done(err, user);
        // });
            done(null, user);
    });

    // configure passport to use our Azure-specific OAuth2 strategy
    passport.use(oauth.getStrategy(config, User));

    return passport;
};