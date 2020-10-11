const jwt = require('jsonwebtoken');
const config = require('config');

// this is the middleware to verify the jwt token
// put this middleware in the api to protect the access
module.exports = function(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(err) {
        return res.status(401).json({ msg: 'Token is not valid'});
    }
}