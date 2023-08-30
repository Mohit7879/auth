const router=require('express').Router();
const passport=require('passport')




router.get('/',(req,res)=>{
    res.render('signup');
})
router.use('/signin',require('./signin'));
router.use('/signup',require('./signup'));
router.use('/password',require('./password'));

module.exports=router;


