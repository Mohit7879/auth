const router=require('express').Router();

router.get('/resetpasswordpage',(req,res)=>{
   res.render('password');
});



const forgot_pass=require('../config/forgot_password');

// 
router.post('/forget_pass',forgot_pass.forgot_pass);


// for rendering forgot password page
router.get('/resetpassword/:token',(req,res)=>{
   console.log('inside %%%%%%%%%%%%% reset password')
      res.locals.token=req.params.token;
      res.locals.user=req.user;
        return res.redirect('/password/resetpasswordpage');
    
})


router.post('/updatepassword',forgot_pass.updatepass);

module.exports=router;


