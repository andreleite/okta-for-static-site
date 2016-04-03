var options = require('../lib/options')(require('./fixtures/okta-for-static-site'));
var app = require('../lib/express');

describe('App', function () {
  it('should be defined', function () {
    expect(app).toBeDefined();
  });
});
