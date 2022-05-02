### CommonJS and ES6

backend => CommonJS => const xxx = Require(....) => module.exports = xxxx

frontend browser => ES6 => import xxxx, {yyy, zzz} from cccc => export default zzzz

### install package and dependencies
```
npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request

-- development use
npm i -D nodemon concurrently 
```

### package.json

add start and server tag and using "nodemon" by 'npm run server'

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

to use different config file, it is required to set NODE_ENV before running the application

in bash, NODE_ENV=prd node server.js

node-config could read the prd.json file for the variables.

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

get all profiles at GET api\profile

add profile experience API and need to unshift and remove the item from the array

### create post model and api

post model at \models\post.js

post api at \routes\api\posts.js

create posts api, create likes api and comment api

### setup ui

define the layout and css, refer to the test\devconnector_html_theme

another tutorial link to build the html css sass from scratch

https://www.youtube.com/watch?v=IFM9hbapeA0&list=PLillGF-Rfqba3xeEvDzIcUCxwMlGiewfV

### setup react

npx create-react-app client

add client startup and concurrently run both server and client for the development

by using "concurrently" module

and then run "npx run dev" to start both client and server

```
"client": "npm start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\""
```

install dependencies for the react client

npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment

add proxy setting in the package.json of client

so we don't want to call axios.get('https://localhost:5000")

we want to use axios.get('/api/users/....');

```
"proxy": "http://localhost:5000"
```

### create react components

App.js => fragment, it's just a ghost element and won't show up in dom

create Navbar and Landing component

add the Navbar and Landing component to the App component


### add react router, route, switch from react-dom 

define the route path in the App.js

create auth\Login and auth\Register components

define switch for the path mapped to Login and Register component

define the Link in the Navbar instead of using the html a

### start to use react hook

apply useState to create the formData and setFormData and then create onChange method to dynamic update the field to the state

user axios to call the create user api

need to know to supplement the config(headers), body data and the url for the api call






