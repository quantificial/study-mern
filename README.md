### install package and dependencies
```
npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request

npm i -D nodemon concurrently
```

### package.json

add start and server tag and using "nodemon" by 'npm start server'

```
  "scripts": {
    "start": "node server",
    "server": "nodemon server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### add server.js as the core entry point.

use express and mongoose

define db.js for the database connection

create default.json under "config" folder for the connection string

```
{
    "mongoURI": "mongodb+srv://xxxx:yyyy@xxxx.aaaa.mongodb.net/test?retryWrites=true&w=majority",
    "jwtSecret": "myToken123"
}
```

### create api and route

create auth, posts, profile and user api under routes\api folder

use express app.use to binding the api

### create user models

create the user.js in the models folder

and then create the schema of using the mongoose schema

### create user api, routes\api\users.js

create the post register user api 

need to add the json middleware, express.json(), to the express in server.js

use express-validator to check the data input of the json body

use bcrypt to encrypt the password

use gravatar to create the avatar

use mongoose findOne to check whether the user exists and then save the user

use jwt to sign the payload which contains the user id

### jwt verification

create the middleware auth.js which could be used to verify the JWT and protect the access of the APIs

create an api in the auth api module (routes\api\auth.js) and use middleware to check the token, if the token is valid, return the user object but without the password

### create profile model and api

profile model models\profile.js

profile api at routes\api\profile.js

create api\profile\me api to retrieve the profile information and need to connec to the user object

create profile at POST api\profile



