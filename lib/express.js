var express = require('express');
var app = express();
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('./passport');
var options = require('./options')();
var middleware = require('./express-middleware');

if (options.redisUrl) {
  options.sessionOptions.store = new RedisStore({
    url: options.redisUrl
  });
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(options.sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(middleware.authenticate);
app.use(compression({level: options.compressionLevel}));
app.use(express.static(options.staticSitePath));
app.all('/login', passport.authenticate('saml'), middleware.login);
app.get('/login/logout', middleware.logout);
app.all('*', middleware.custom404);

module.exports = app;
