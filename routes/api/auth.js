const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const User = require('../../models/user');

// @route   GET api/auth
// @desc    Test route
// @access  Public
// router.get('/', (req,res)=> res.send('auth route...'));

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('server error...');
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [  
    // use express validator for the data checking    
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
async (req, res) => { // async method as need to use await for the promise return function
    
    // apply express validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // if there is any errors, retrun 400 as bad request
       return res.status(400).json({errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        // check if user exists
        let user = await User.findOne({email}); // await => wait for the promise object return

        if(!user) {
            return res.status(400)
                .json({ errors: [{msg: 'invalid credentials '}]});
        }

        // verify the password
        const isMatch = await bcrypt.compare(password, user.password);

        //console.log(`ismatch ${isMatch}`);
        
        if(!isMatch) {
            return res.status(400)
                .json({ errors: [{msg: 'invalid credentials '}]});
        }

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
                return res.json({token});
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