var argv = require('yargs')
  .usage('Usage: $0 [options]')
  .env('OFSS')
  .config('c', 'JSON file with configuration.')
  .alias('c', 'config')
  .default('c', './okta-for-static-site.json')
  .option('i', {
    alias: 'oktaIssuer',
    description: 'From your Okta app.',
    demand: true
  })
  .option('u', {
    alias: 'oktaSingleSignOnUrl',
    description: 'From your Okta app.',
    demand: true
  })
  .option('t', {
    alias: 'oktaCert',
    description: 'From your Okta app. You can inform a path or the content of certificate.',
    demand: true
  })
  .option('f', {
    alias: 'staticSitePath',
    description: 'Path to files to serve.',
    default: '.'
  })
  .option('x', {
    alias: 'sessionSecret',
    description: 'Used to sign session cookie. Very important for your security!',
    default: 'secret'
  })
  .option('r', {
    alias: 'redisUrl',
    description: 'URL for connect with your Redis instance, in the format "redis://127.0.0.1:6379". We use Redis to manage sessions. Without Redis, session data is stored in memory, and doesn\'t have capacity to manage sessions for a production site.'
  })
  .option('n', {
    alias: 'custom404',
    description: 'Inform a custom 404 file to send to users in case of file not found.'
  })
  .option('z', {
    alias: 'compressionLevel',
    description: 'Compression level of served files. This is an integer in the range of 0 (no compression) to 9 (maximum compression).',
    default: '6'
  })
  .option('o', {
    alias: 'oktaCookieName',
    description: 'Name of the cookie with user info accessible from your static site.',
    default: 'okta-data'
  })
  .option('s', {
    alias: 'sessionCookieName',
    description: 'Name of signed cookie with session id.',
    default: 'session-id'
  })
  .option('p', {
    alias: 'serverPort',
    description: 'Port to use for the server.',
    default: '3000'
  })
  .option('j', {
    alias: 'serverSslCert',
    description: 'Certificate to use if you want https. To enable https provide SSL certificate and key. You can inform a path or a string with content of certificate.'
  })
  .option('k', {
    alias: 'serverSslKey',
    description: 'Key to use if you want https. To enable https provide SSL certificate and key. You can inform a path or a string with content of key.'
  })
  .epilog('You can use environment variables too. For more info go to https://github.com/andreleite/okta-for-static-site/')
  .argv;

module.exports = argv;
