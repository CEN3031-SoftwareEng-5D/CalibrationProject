const express = require('express');
const router = express.Router();
const {signup, signin,signout, requireSignin} = require('../controllers/signup')
//validation
const{runValidation} = require('../validators/')
const{userSignupValidator, userSigninValidator} = require('../validators/auth')
//declaration of User from schema
let User = require('../models/UserModel');
//pull data
router.get('/signup', function(req, res){
    res.send({type: 'register'});
});
//submit data
router.post('/signup',userSignupValidator,runValidation,signup);
router.post('/signin',userSigninValidator,runValidation,signin);
// to signout its a get 
router.get('/signout',signout);

//test for authentication and token
router.get('/secret', requireSignin, (req,res)=>{
    res.json({
        message: 'Secret Page'
    });
});

module.exports = router;