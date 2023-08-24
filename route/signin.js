
const router=require('express').Router();
const User=require('../model/user');
const passport=require('passport');
const home_controller=require('../controller/home_controller')


router.get('/signinpage',(req,res)=>{
    res.render('signin');
})

//  authentication  using passport local

router.post('/signin', passport.authenticate(
    'local',
    {failureRedirect: '/signin/loginpage'},
),home_controller.home);

router.get('/logout', function(req, res){
    req.logout({})
       
   
  });


  // authentication using passport google strategy


  router.get('/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/users/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.render('home');
  });
  
    
 
module.exports=router;