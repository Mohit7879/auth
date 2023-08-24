const router=require('express').Router();


const forgot_pass=require('../config/forgot_password');


router.post('/forget_pass',forgot_pass.forgot_pass);

router.get('/resetpassword/:token',(req,res)=>{
   console.log('inside %%%%%%%%%%%%% reset password')
      res.locals.token=req.params.token;
        return res.render('password');
    
})


router.post('/updatepassword',forgot_pass.updatepass);

module.exports=router;


