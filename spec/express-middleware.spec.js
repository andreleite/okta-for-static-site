var options = require('../lib/options')(require('./fixtures/okta-for-static-site'));
var middleware = require('../lib/express-middleware');

describe('Middleware', function () {
  it('should be defined', function () {
    expect(middleware).toBeDefined();
  });

  describe('#authenticate', function () {
    it('should be defined', function () {
      expect(middleware.authenticate).toBeDefined();
    });
  });

  describe('#login', function () {
    it('should be defined', function () {
      expect(middleware.login).toBeDefined();
    });
  });

  describe('#logout', function () {
    it('should be defined', function () {
      expect(middleware.logout).toBeDefined();
    });
  });
});
