const express = require("express");
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const router = express.Router();

// @route		POST api/users
// @desc		create new user
// @access	public
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
    
    const user = await User.create(userData)

    res.json(user);
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
    
    

  
 }
);



module.exports = router;