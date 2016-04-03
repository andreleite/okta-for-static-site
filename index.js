var argv = require('optimist').argv;
var options = require('./lib/options')(argv.c || argv.config);
var server = require('./lib/server');

server();
