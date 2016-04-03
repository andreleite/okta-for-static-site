var options = require('../lib/options')(require('./fixtures/okta-for-static-site'));
var passport = require('../lib/passport');

describe('Passport', function () {
  it('should be defined', function () {
    expect(passport).toBeDefined();
  });
});
