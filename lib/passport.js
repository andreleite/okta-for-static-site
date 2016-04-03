var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
var options = require('./options')();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new SamlStrategy({
  issuer: options.oktaIssuer,
  entryPoint: options.oktaSingleSignOnUrl,
  cert: options.oktaCert
}, function (profile, done) {
  if (!profile.nameID) {
    return done(new Error("No user found"), null);
  }
  return done(null, profile);
}));

module.exports = passport;
