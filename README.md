# Okta for Static Site

## Description

Use this npm module to serve your static site behind Okta Single Sign On.

## Create an Okta App

To use this software you need to create an SAML2 Okta App. More info here: http://developer.okta.com/docs/guides/oan_guidance.html.

## Installation

```
npm install okta-for-static-site -g
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
  -r, --redisUrl             URL for connect with your Redis instance in the
                             format "redis://127.0.0.1:6379". We use Redis to
                             manage sessions. Without Redis, session data is
                             stored in memory and errors are very commons.
  -o, --oktaCookieName       Name of the cookie with user info accessible from
                             your static site.            [default: "okta-data"]
  -s, --sessionCookieName    Name of signed cookie with session id.
                                                         [default: "session-id"]
  -p, --serverPort           Port to use for the server.       [default: "3000"]
  -j, --serverSslCert        Cert to use if you want https. To enable https
                             provide SSL certificate and key. You can inform a
                             path or a string with content of certificate.
  -k, --serverSslKey         Key to use if you want https. To enable https
                             provide SSL certificate and key. You can inform a
                             path or a string with content of key.

You can use enviroment variables too. For more info go to
https://github.com/andreleite/okta-for-static-site/
```

### Enviroment variables

You can use enviroment variables. For example, to inform the value of te parameter oktaIssuer, use a enviroment variable with the name `OFSS_OKTA_ISSUER`. `OFSS_` is a added prefix to identify the variables that program will be read. Then, the original camel case variable name (`oktaIssuer`) is converted to a upper snake case (`OKTA_ISSUER`) and concatened with prefix.

Program arguments are defined in this order of precedence:

1. Command line args
2. Config file
3. Env var
4. Configured defaults

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
  "staticSitePath": "public"
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
  "staticSitePath": "public"
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
