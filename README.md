### install package
```
npm i express express-validator bcryptjs config gravator jsonwebtoken mongoose request

npm i -D nodemon concurrently
```

### package.json

add start and server tag and using nodemon by 'npm start server'
```
  "scripts": {
    "start": "node server",
    "server": "nodemon server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```