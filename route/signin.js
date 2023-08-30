
const router=require('express').Router();
const User=require('../model/user');
const passport=require('passport');
const home_controller=require('../controller/home_controller')


router.get('/signinpage',(req,res)=>{
    res.render('signin');
})

//  authentication  using passport local

router.post('/login', passport.authenticate(
    'local',
    {failureRedirect: '/signin/loginpage'},
),home_controller.home);

router.get('/logout', function(req, res,next){
    req.logout((err)=>{
        console.log(err)
        return res.redirect('/signin/signinpage')
    })
    
   
  });


  // authentication using passport google strategy

  router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
  
  router.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.render('home');
  });
 
    
 
module.exports=router;