var config = require('./fixtures/okta-for-static-site');
var options = require('../lib/options')(config);

describe('Options', function () {
  it('should be defined', function () {
    expect(options).toBeDefined();
  });

  it('should return the correct options', function () {
    expect(options.oktaIssuer).toBe(config.oktaIssuer);
    expect(options.oktaSingleSignOnUrl).toBe(config.oktaSingleSignOnUrl);
    expect(options.oktaCookieName).toBe(config.oktaCookieName);
    expect(options.sessionOptions.name).toBe(config.sessionCookieName);
    expect(options.sessionOptions.secret).toBe(config.sessionSecret);
    expect(options.redisUrl).toBe(config.redisUrl);
    expect(options.serverPort).toBe(config.serverPort);
    expect(options.compressionLevel).toBe(config.compressionLevel);
  });
});
