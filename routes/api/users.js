const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../../models/user');

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res)=> res.send('user route...'));


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [  
    // use express validator for the data checking
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please entry a password with 6 or more characters').isLength({min: 6})
], 
async (req, res) => { // async method as need to use await for the promise return function
    
    // apply express validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // if there is any errors, retrun 400 as bad request
       return res.status(400).json({errors: errors.array() });
    }

    console.log(req.body);
    const {name, email, password} = req.body;

    try {
        // check if user exists
        let user = await User.findOne({email}); // await => wait for the promise object return

        if(user) {
            res.status(400).json({ errors: [{msg: 'user already exists'}]});
        }

        // get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        // encrypt password

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // define the payload
        const payload = {
            user: {
                id: user.id                
            }
        }

        // return json web token
        jwt.sign(payload, 
            config.get('jwtSecret'),  // get the token from the config file
            {expiresIn: 36000}, 
            (err, token) => { // define the callback function to get the signed token
                if(err) throw err;
                res.json({token});
            }
            );

        //return res.send('user registered...')

    }catch(err) {
        console.error(err.message);
        return res.status(500).send('server error...');
    }

    //res.send('register user...')
});

module.exports = router;

