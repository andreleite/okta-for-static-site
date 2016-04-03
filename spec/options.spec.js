var options = require('../lib/options')(require('./fixtures/okta-for-static-site'));
describe('Options', function () {
  it('should be defined', function () {
    expect(options).toBeDefined();
  });
});
