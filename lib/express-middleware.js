var options = require('./options')();

function authenticate(req, res, next) {
  if (req.isAuthenticated() || req.originalUrl.indexOf('/login') === 0) {
    next();
  } else {
    res.cookie('redirect', req.originalUrl);
    res.redirect('/login');
  }
}

function login(req, res) {
  var userData = req.session.passport.user;
  var redirectPath = req.cookies.redirect;

  if (userData) {
    delete userData.issuer;
    delete userData.nameID;
    delete userData.nameIDFormat;
    delete userData.sessionIndex;
    res.cookie(options.oktaCookieName, userData);
  }

  if (redirectPath) {
    res.clearCookie('redirect');
    res.redirect(redirectPath);
  } else {
    res.redirect('/');
  }
}

function logout(req, res) {
  req.session.destroy();
  res.clearCookie(options.oktaCookieName);
  res.redirect(options.oktaLogoutUrl);
}

module.exports = {
  authenticate: authenticate,
  login: login,
  logout: logout
};
