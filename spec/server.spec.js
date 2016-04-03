var options = require('../lib/options')(require('./fixtures/okta-for-static-site'));
var server = require('../lib/server');

describe('Server', function () {
  it('should be defined', function () {
    expect(server).toBeDefined();
  });
});
