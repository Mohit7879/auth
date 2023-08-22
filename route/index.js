const router=require('express').Router();
const home_controller=require('../controller/home_controller')
const User=require('../model/user');
const passport=require('passport');
const forgot_pass=require('../config/forgot_password');

const bcrypt = require('bcryptjs');

router.get('/signuppage',(req,res)=>{
    res.render('signup');
})

router.get('/signinpage',(req,res)=>{
    res.render('signin');
})


router.post('/forget_pass',forgot_pass.forgot_pass);

router.get('/resetpassword/:token',(req,res)=>{

        res.locals.token=req.params.token;
        return res.render('password');
    
})


 

router.post('/create',async (req,res)=>{
 
     // hash the password
  const salt  =  await bcrypt.genSalt(10);
  const hashedPassword  = await bcrypt.hash(req.body.password, salt);

   await User.create({



    name : req.body.name,
    email : req.body.email,
    password : hashedPassword ,

   });
   return res.send('created');
    
})

router.post('/signin', passport.authenticate(
    'local',
    {failureRedirect: '/signin/loginpage'},
),home_controller.home);

router.get('/logout', function(req, res){
    req.logout({})
       
   
  });
  
    
 
module.exports=router;


