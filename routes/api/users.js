const express = require("express");
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const router = express.Router();
const isEmpty = require('../../utils/isEmpty');
const jwt = require('jsonwebtoken');
const config = require('../../config/default.json');

// @route		POST api/users
// @desc		create new user
// @access	    public
router.post("/", 
[
    check('email','Email Required').not().isEmpty(),
    check('email','Valid Email Required').isEmail(),
    check('password','Please enter a password with at least six chrachters').isLength({ min:6 })
],
 async (req, res) => {
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
  
  
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    try{
        const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt)
    
    

    //create code that will check if email is already in use
    const existing = await User.find({ email:userData.email });


    if(!isEmpty(existing)) {
        return res.status(400).json({ email:'email Exists' });
    }


    const user = await User.create(userData)

    

    res.json(user);
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    };


    
    

  
 }
);

// @route		PUT api/users/
// @desc		login a user
// @access	    public

router.put('/', 
[
    check('email','Email Required').not().isEmpty(),
    check('email','Valid Email Required').isEmail(),
    check('password','Password Required').not().isEmpty()
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findOne({ email: req.body.email })
            if(isEmpty(user)) {
                return req.status(404).json({ email: "E-mail not found" })
            }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if(!isMatch) {
            req.status(401).json({ password: "incorrect password" })
        }

        //validated! challenge create the token and return it to the user
            User.findByIdAndUpdate(user.id, {lastLogin: Date.now()});
        // information => encoder = key => token => decoder + key => information
        //                             tofe     tobe 
        

        const payload = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(payload, config.secretOrKey);

        return res.json(token)

        
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});



module.exports = router;