var https = require('https');
var options = require('./options')();
var app = require('./express');

function createServer() {
  var server;
  if (options.sslKey && options.sslCert) {
    server = https.createServer({
      key: options.sslKey,
      cert: options.sslCert
    }, app);
    server.listen(options.serverPort, function () {
      console.log('Listening on port %d', options.serverPort);
    });
  } else {
    app.listen(options.serverPort, function () {
      console.log('Listening on port %d', options.serverPort);
    });
  }
}

module.exports = createServer;
