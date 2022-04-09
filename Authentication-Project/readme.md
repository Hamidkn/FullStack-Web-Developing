# Authentication: 
There are some levels of authentication.

## Fisrt level is the simple one, 
just register and login to have access to the defined page.

## seconed level is the Encryption:
```
npm install mongoose-encryption
```

Usage: 
```
var mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

var userSchema = new mongoose.Schema({
    name: String,
    age: Number
    // whatever else
});

// Add any other plugins or middleware here. For example, middleware for hashing passwords

var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

User = mongoose.model('User', userSchema);
```
Or the another way: 
### Secret String Instead of Two Keys
For convenience, you can also pass in a single secret string instead of two keys.
```
var secret = process.env.SOME_LONG_UNGUESSABLE_STRING;
userSchema.plugin(encrypt, { secret: secret });
```
Other method is to use environment variables to keep secret safe:
https://www.npmjs.com/package/dotenv
``` 
npm install dotenv
```
this package must required at the top of the app.js
```
require('dotenv').config();
```
in the root folder, create a ```.env``` file.

### Level 3 is Hashing Passwords

Caesar Ciphar is a very weak method for encryption.
using hashing passwords it is almost immpossible to turn a hash back into a passwrod.

a JavaScript function for hashing messages with MD5.
```
npm install md5
```

### Level 4: Hashing and salting
In addition of the password, we generate a random set of charchters. this charachters along the user's password are combined,
and then put through hash function.

```
npm install bcrypt
```
using bcrypt.
https://github.com/kelektiv/node.bcrypt.js
```
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
```
### Level 5: Cookies and Sessions
#### Passport:
Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be dropped in to any Express-bassed web applications. A comprehensive set of strategies support authentication using a username and password, Facebbok, twitter and more.
```
https://www.npmjs.com/package/passport

$ npm install passport
$ npm install passport-local
$ npm install passport-local-mongoose
$ npm install express-session
```
read the documentation:
https://www.npmjs.com/package/express-session
https://www.passportjs.org/
https://www.passportjs.org/packages/

In this case, because the server saves cookies, the user if register and log in to his portal. If he close without loging out and he comes back moments later, thanks to the cookies, the user is authenticated and directly redirected to the portal without any registeration or logging. If you quit the browser and comes back you must authenticate your self by registering or logging.
and the cookies are deleted every time we restart the server. basically, the cookies are saved when the server started and deleted when the server ended.

It is important to read the documentation.

### Level 6: Third Party OAuth 2.0 = Open Authorisation
use third party softwares such as gmail, facebook for authentication.

OAuth2 is an authentication protocol that is used to authenticate and authorize users in an application by using another service provider.

tryo to log in with google using passport and google oauth. 

```
https://www.passportjs.org/packages/passport-google-oauth2/
```
### Sign in with Google
for creating clientID, and clientSecret you must go ```https://console.cloud.google.com/apis/dashboard``` and make an API key and using create credintials.
then sace both of them in ```.env``` file.

be sure you put everything in it's right place.

```
npm install mongoose-findorcreate
```
### sign in with Facebook
go to this link and create a project.
```
https://developers.facebook.com/apps/
```