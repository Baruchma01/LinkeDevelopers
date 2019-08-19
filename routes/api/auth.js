const express =require('express');
const router=express.Router();
const auth=require('../../middleware/auth')
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User= require('../../models/User')
// @route     GET api/auth
// @desc      Test route with token and get the user
// @access     Public
router.get('/',auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});


// @route     POST api/auth
// @desc      Authenticate user(LOGIN) & get token
// @access     Public
router.post(
    "/",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Password is required"
      ).exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // Check if user exist
        let user = await User.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        //Check if Password Match
        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400)
            .json({errors:[{msg:'Invaild Credentials'}]})

        }
  
        // Return jsonwebtoken
        const payload = {
          user: {
            id: user.id
          }
        };
    
        jwt.sign(payload, config.get("jwtSecret"),{
            expiresIn:360000
        },(err,token)=>{
            if(err) throw err;
            res.json({ token })
        });
  
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server errors");
      }
    }
  );

module.exports=router;