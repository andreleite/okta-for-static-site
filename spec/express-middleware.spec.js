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
    var req;
    var res;
    beforeEach(function () {
      req = {
        session: {
          passport: {
            user: {}
          }
        },
        cookies: {
          redirect: null
        }
      };
      res = {
        cookie: function () {},
        clearCookie: function () {},
        redirect: function () {}
      };
    });

    it('should be defined', function () {
      expect(middleware.login).toBeDefined();
    });

    it('should save a cookie with user data', function () {
      spyOn(res, 'cookie');
      middleware.login(req, res);
      expect(res.cookie).toHaveBeenCalledWith(options.oktaCookieName, req.session.passport.user);
    });

    it('should remove sensitive user data before save the cookie', function () {
      spyOn(res, 'cookie');
      req.session.passport.user = {
        issuer: 'foo',
        nameID: 'foo',
        nameIDFormat: 'foo',
        sessionIndex: 'foo'
      };
      middleware.login(req, res);
      expect(res.cookie).toHaveBeenCalledWith(options.oktaCookieName, {});
    });

    it('should redirect to path specified in the redirect cookie', function () {
      req.cookies.redirect = '/foo';
      spyOn(res, 'redirect');
      middleware.login(req, res);
      expect(res.redirect).toHaveBeenCalledWith(req.cookies.redirect);
    });

    it('should erase redirect cookie when there is one', function () {
      req.cookies.redirect = '/foo';
      spyOn(res, 'clearCookie');
      middleware.login(req, res);
      expect(res.clearCookie).toHaveBeenCalledWith('redirect');
    });

    it('should redirect to "/" there is no redirect cookie', function () {
      spyOn(res, 'redirect');
      middleware.login(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });

  describe('#logout', function () {
    var req;
    var res;
    beforeEach(function () {
      req = {
        session: {
          destroy: function () {}
        }
      };
      res = {
        clearCookie: function () {},
        redirect: function () {}
      };
    });

    it('should be defined', function () {
      expect(middleware.logout).toBeDefined();
    });

    it('should destroy the session', function () {
      spyOn(req.session, 'destroy');
      middleware.logout(req, res);
      expect(req.session.destroy).toHaveBeenCalled();
    });

    it('should clear user data cookie', function () {
      spyOn(res, 'clearCookie');
      middleware.logout(req, res);
      expect(res.clearCookie).toHaveBeenCalledWith(options.oktaCookieName);
    });

    it('should redirect to Okta Logout Url', function () {
      spyOn(res, 'redirect');
      middleware.logout(req, res);
      expect(res.redirect).toHaveBeenCalledWith(options.oktaLogoutUrl);
    });
  });

  describe('#custom404', function () {
    it('should be defined', function () {
      expect(middleware.custom404).toBeDefined();
    });
  });
});
