var fs = require('fs');
var path = require('path');
var url = require('url');
var config;
var options = {
  sessionOptions: {}
};

function adjustPath(p) {
  if (!path.isAbsolute(p)) {
    p = path.join(process.cwd(), p);
  }
  return p;
}

function checkRequiredItems() {
  if (!options.oktaIssuer || !options.oktaSingleSignOnUrl || !options.oktaCertPath || !options.sessionSecret || !options.staticSitePath) {
    throw new Error("Required options have to be informed: oktaIssuer, oktaSingleSignOnUrl, oktaCertPath, sessionSecret and staticSitePath");
  }
}

function getLogoutUrl(options) {
  var ssoUrl = url.parse(options.oktaSingleSignOnUrl);
  return ssoUrl.protocol + '//' + ssoUrl.host + '/login/signout?fromURI=' + encodeURIComponent(ssoUrl.path);
}

function getOptions(configPath, argv) {
  if (!config) {
    config = require(adjustPath(configPath));

    // Okta Options
    options.oktaIssuer = argv.oktaIssuer || config.oktaIssuer;
    options.oktaSingleSignOnUrl = argv.oktaSingleSignOnUrl || config.oktaSingleSignOnUrl;
    options.oktaCert = fs.readFileSync(adjustPath(argv.oktaCertPath || config.oktaCertPath), 'utf-8');

    // Creating logout URL
    options.oktaLogoutUrl = getLogoutUrl(options);

    // Setting cookie names
    options.oktaCookieName = argv.oktaCookieName || config.oktaCookieName || 'oktaData';
    options.sessionOptions.name = argv.sessionCookieName || config.sessionCookieName || 'sessionId';

    // Session options
    options.sessionOptions.secret = argv.sessionSecret || config.sessionSecret;
    options.sessionOptions.resave = true;
    options.sessionOptions.saveUninitialized = false;
    options.sessionOptions.cookie = { secure: true };

    // Session store
    options.redisUrl = argv.redisUrl || config.redisUrl;

    // Server options
    if (config.serverSslCertPath) {
      options.sslCert = fs.readFileSync(adjustPath(argv.serverSslCertPath || config.serverSslCertPath), 'utf-8');
    }
    if (config.serverSslKeyPath) {
      options.sslKey = fs.readFileSync(adjustPath(argv.serverSslKeyPath || config.serverSslKeyPath), 'utf-8');
    }
    options.serverPort = argv.serverPort || config.serverPort || 3000;

    // Static site path
    options.staticSitePath = adjustPath(config.staticSitePath);

    checkRequiredItems();
  }
  return options;
}

module.exports = getOptions;
