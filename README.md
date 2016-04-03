# Okta for Static Site

## Description

Use this npm module to serve your static site behind Okta Single Sign On.

## Installation

```
npm install okta-for-static-site -g
```

## Usage

```
usage: okta-for-static-site [options]

options:

  -c --config            Path to json config file. You can put required information in config file or use CLI parameters. CLI parameters take precedence

  --oktaIssuer           From your Okta app
  --oktaSingleSignOnUrl  From your Okta app
  --oktaCertPath         From your Okta app
  --sessionSecret        Used to sign session cookie
  --staticSitePath       Path to files to serve
  --oktaCookieName       Optional. Default is "oktaData"
  --sessionCookieName    Optional. Default is "SessionId"
  --redisUrl             Optional but recommended. We use Redis to manage sessions. Without Redis, session data is stored in memory and errors are very commons
  --serverSslCertPath    Optional. Use if you want https
  --serverSslKeyPath     Optional. Use if you want https
  --serverPort           Optional. Default is 3000

  -h --help    Print this list and exit
```

## Example of config file

```
{
  "oktaIssuer": "http://www.okta.com/xxxxxxxxxxxxxxxxxxxx",
  "oktaSingleSignOnUrl": "https://xxxxxxxxxx.okta.com/app/xxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxx/sso/saml",
  "oktaCertPath": "/home/ubuntu/okta.cert",
  "oktaCookieName": "oktaData",
  "sessionCookieName": "sessionId",
  "sessionSecret": "xxxxxxxxx",
  "redisUrl": "redis://127.0.0.1:6379",
  "serverSslCertPath": "/home/ubuntu/cert.pem",
  "serverSslKeyPath": "/home/ubuntu/key.pem",
  "serverPort": 443,
  "staticSitePath": "/home/ubuntu/public"
}
```
