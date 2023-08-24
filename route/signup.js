const router=require('express').Router();
const home_controller=require('../controller/home_controller')
const User=require('../model/user');

router.get('/signuppage',(req,res)=>{
    res.render('signup');
})




router.post('/create',async (req,res)=>{
    const isexist=await User.findOne({email:req.body.email});
    if(isexist){
        res.render('signin');
    }
 
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

  
    
 
module.exports=router;