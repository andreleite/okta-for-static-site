var options = require('../lib/options')(require('./fixtures/okta-for-static-site'));
var middleware = require('../lib/express-middleware');

describe('Middleware', function () {
  it('should be defined', function () {
    expect(middleware).toBeDefined();
  });

  describe('#authenticate', function () {
    var req;
    var res;
    var next;
    beforeEach(function () {
      req = {
        isAuthenticated: function () {},
        originalUrl: ''
      };
      res = {
        cookie: function () {},
        redirect: function () {}
      };
      next = jasmine.createSpy('next');
    });

    it('should be defined', function () {
      expect(middleware.authenticate).toBeDefined();
    });

    it('should call next if req.isAuthenticated() return true', function () {
      spyOn(req, 'isAuthenticated').and.returnValues(true);
      middleware.authenticate(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should call next if path start with "/login"', function () {
      req.originalUrl = '/login';
      middleware.authenticate(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    describe('when user is not autheticate and path doens\'t start with "/login"', function () {
      it('should create a cookie if path is different of "/"', function () {
        spyOn(res, 'cookie');
        req.originalUrl = '/foo';
        middleware.authenticate(req, res, next);
        expect(res.cookie).toHaveBeenCalledWith('redirect', req.originalUrl);
      });

      it('shouldn\'t create a cookie if path is "/"', function () {
        spyOn(res, 'cookie');
        req.originalUrl = '/';
        middleware.authenticate(req, res, next);
        expect(res.cookie).not.toHaveBeenCalled();
      });

      it('should redirect to login', function () {
        spyOn(res, "redirect");
        middleware.authenticate(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/login');
      });
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

  describe('#custom404', function () {
    it('should be defined', function () {
      expect(middleware.custom404).toBeDefined();
    });
  });
});
