# Okta for Static Site

[![NPM](https://nodei.co/npm/okta-for-static-site.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/okta-for-static-site/)
[![Build Status](https://travis-ci.org/andreleite/okta-for-static-site.svg?branch=master)](https://travis-ci.org/andreleite/okta-for-static-site)

## Purpose

Use this npm module to serve your static site behind Okta Single Sign On.

## Create an Okta App

To use this software you need to create a SAML2 Okta App. More info here: http://developer.okta.com/docs/guides/oan_guidance.html.

IMPORTANT: In the app configuration, use `http[s]://DOMAIN:PORT/login` in the field `Single Sign On URL`. Eg: `http://localhost:3000/login`.

IMPORTANT 2: Don't put a static page in any path starting with `/login`. This breaks the login system.

## Installation

```
[sudo] npm install okta-for-static-site -g
```

## Usage

```
Usage: okta-for-static-site [options]

Options:
  -c, --config               JSON file with configuration.
                                        [default: "./okta-for-static-site.json"]
  -i, --oktaIssuer           From your Okta app.                      [required]
  -u, --oktaSingleSignOnUrl  From your Okta app.                      [required]
  -t, --oktaCert             From your Okta app. You can inform a path or the
                             content of certificate.                  [required]
  -f, --staticSitePath       Path to files to serve.              [default: "."]
  -x, --sessionSecret        Used to sign session cookie. Very important for
                             your security!                  [default: "secret"]
  -r, --redisUrl             URL for connect with your Redis instance, in the
                             format "redis://127.0.0.1:6379". We use Redis to
                             manage sessions. Without Redis, session data is
                             stored in memory, and doesn't have capacity to
                             manage sessions for a production site.
  -n, --custom404            Inform a custom 404 file to send to users in case
                             of file not found.
  -z, --compressionLevel     Compression level of served files. This is an
                             integer in the range of 0 (no compression) to 9
                             (maximum compression).               [default: "6"]
  -o, --oktaCookieName       Name of the cookie with user info accessible from
                             your static site.            [default: "okta-data"]
  -s, --sessionCookieName    Name of signed cookie with session id.
                                                         [default: "session-id"]
  -p, --serverPort           Port to use for the server.       [default: "3000"]
  -j, --serverSslCert        Certificate to use if you want https. To enable
                             https provide SSL certificate and key. You can
                             inform a path or a string with content of
                             certificate.
  -k, --serverSslKey         Key to use if you want https. To enable https
                             provide SSL certificate and key. You can inform a
                             path or a string with content of key.

You can use environment variables too. For more info go to
https://github.com/andreleite/okta-for-static-site/
```

### Environment variables

You can use environment variables. For example, to inform the value of `oktaIssuer`, use an environment variable with the name `OFSS_OKTA_ISSUER`. `OFSS_` is an added prefix to identify the variables that this software will read. Then, the original camel case variable name (`oktaIssuer`) is converted to an upper snake case (`OKTA_ISSUER`) and concatened with prefix.

Program arguments are defined in this order of precedence:

1. Command line arguments
2. Config file
3. Environment variable
4. Configured defaults

### Paths

All relative paths use the dir where you started the command as base dir. You can use absolute paths, if you prefer.

## Examples of config file

### Using paths to certificates

```
{
  "oktaIssuer": "http://www.okta.com/xxxxxx",
  "oktaSingleSignOnUrl": "https://xxxxxx.okta.com/app/xxxxxx/xxxxxx/sso/saml",
  "oktaCert": "okta.cert",
  "oktaCookieName": "oktaData",
  "sessionCookieName": "sessionId",
  "sessionSecret": "xxxxxxxxx",
  "redisUrl": "redis://127.0.0.1:6379",
  "serverSslCert": "cert.pem",
  "serverSslKey": "key.pem",
  "serverPort": 443,
  "staticSitePath": "public",
  "custom404": "404/index.html"
}
```

### Using contents of certificates (The contents of certificates are truncated)

```
{
  "oktaIssuer": "http://www.okta.com/xxxxxx",
  "oktaSingleSignOnUrl": "https://xxxxxx.okta.com/app/xxxxxx/xxxxxx/sso/saml",
  "oktaCert": "-----BEGIN CERTIFICATE-----\nMIIDpDCCAoygAwIBAgIGAVPDStHJMA0GCSqGSIb3DQEBBQUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1U (...) luF\nN8KPXW8Vo5/A+5/yVeBaIV8rMtPUz7jc\n-----END CERTIFICATE-----\n",
  "oktaCookieName": "oktaData",
  "sessionCookieName": "sessionId",
  "sessionSecret": "xxxxxxxxx",
  "redisUrl": "redis://127.0.0.1:6379",
  "serverSslCert": "-----BEGIN CERTIFICATE-----\nMIIEGzCCAwOgAwIBAgIJAMDQ9pOnWa7yMA0GCSqGSIb3DQEBCwUAMIGjMQswCQYD\nVQQ (...) Rbhl\nHAohrf8lAB1u/UTFZYBaTIxYrVDJosL06Y1NqPG4cg8oUAAZmNnG5ni6DsnNyag=\n-----END CERTIFICATE-----\n",
  "serverSslKey": "-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEA4o4mxoUIB92HJHwzDZYt0osdfeVlWzAlex3ZEixikETN4lJH\n5Zq (...) 3n/H\nHVPp5Y7RJ3HbHygNQuXi4goK7wDjYYndg1pLB7ZErcLV3nWTh8A=\n-----END RSA PRIVATE KEY-----\n",
  "serverPort": 443,
  "staticSitePath": "public",
  "custom404": "404/index.html"
}
```

### Minimalist version using just required paraments

```
{
  "oktaIssuer": "http://www.okta.com/xxxxxx",
  "oktaSingleSignOnUrl": "https://xxxxxx.okta.com/app/xxxxxx/xxxxxx/sso/saml",
  "oktaCert": "-----BEGIN CERTIFICATE-----\nMIIDpDCCAoygAwIBAgIGAVPDStHJMA0GCSqGSIb3DQEBBQUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1U (...) luF\nN8KPXW8Vo5/A+5/yVeBaIV8rMtPUz7jc\n-----END CERTIFICATE-----\n"
}
```

## Features

### User data

All `Atributte Staments` configured in Okta are accessible in your static site. When an user logs in, the system write a cookie with default name oktaData (you can change this with parameters). This cookie has a json string with user data and is accessible using Javascript.

### Redis as session storage

You should use Redis to manage sessions for your site. There is a parameter to inform the connection url in the form of `redis://127.0.0.1:6379`.

Without Redis url, the system manage sessions in memory, and doesn't have capacity to manage sessions to a production site.

### Redirect to correct page after login

If a not logged user access a page in your site and is redirect to okta, after login he or she sees the correct page and not the homepage.

This resource uses a cookie named `redirect`. The cookie is deleted after login.

### Logout url

You can show a logout link on your static site. Just point to `/login/logout`.

Logout delete the session cookie of your site and redirect user to okta to close your session there.

After logout, user is redirected to a login customized to redirect user to your homepage if login is made again.

### Custom 404 file

Use the `custom404` parameter to inform a custom 404 page.
