var fs = require('fs');
var path = require('path');
var url = require('url');
var options;

function adjustPath(p) {
  if (!path.isAbsolute(p)) {
    p = path.join(process.cwd(), p);
  }
  return p;
}

function getContent(p) {
  var content = p;
  try {
    p = adjustPath(p);
    stats = fs.statSync(p);
    content = fs.readFileSync(p, 'utf-8');
  } catch (e) {
  }
  return content;
}

function getLogoutUrl(options) {
  var ssoUrl = url.parse(options.oktaSingleSignOnUrl);
  return ssoUrl.protocol + '//' + ssoUrl.host + '/login/signout?fromURI=' + encodeURIComponent(ssoUrl.path);
}

function createOptions(argv) {
  options = {
    sessionOptions: {}
  };

  // Okta Options
  options.oktaIssuer = argv.oktaIssuer;
  options.oktaSingleSignOnUrl = argv.oktaSingleSignOnUrl;
  options.oktaCert = getContent(argv.oktaCert);

  // Creating logout URL
  options.oktaLogoutUrl = getLogoutUrl(options);

  // Setting cookie names
  options.oktaCookieName = argv.oktaCookieName;
  options.sessionOptions.name = argv.sessionCookieName;

  // Session options
  options.sessionOptions.secret = argv.sessionSecret;
  options.sessionOptions.resave = true;
  options.sessionOptions.saveUninitialized = false;
  options.sessionOptions.cookie = { secure: true };

  // Session store
  options.redisUrl = argv.redisUrl;

  // Server options
  if (argv.serverSslCert) {
    options.sslCert = getContent(argv.serverSslCert);
  }
  if (argv.serverSslKey) {
    options.sslKey = getContent(argv.serverSslKey);
  }
  options.serverPort = argv.serverPort;

  // Static site path
  options.staticSitePath = adjustPath(argv.staticSitePath);

  options.compressionLevel = argv.compressionLevel;
}

function getOptions(argv) {
  if (!options) {
    createOptions(argv);
  }
  return options;
}

module.exports = getOptions;
