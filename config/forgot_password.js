const User=require('../model/user')
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

//
module.exports.forgot_pass=async(req,res)=>{

    try{
    const email=req.body.email;
    let user=await User.findOne({email:email})

    if(!user) return res.send('user is invalid')

    const token= jwt.sign({_id:user._id},'secret',{expiresIn:'1h'})

    

        const transporter = nodemailer.createTransport({
            service:"gmail",
            
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: 'mohityadavkkn25@gmail.com',
              pass: 'nfbjdqdwpyakkdyt'
            }
        
          })
        
          const data={
            
            from:'mohityadavkkn25@gmail.com',
            to:`${req.body.email}`,
            subject:'password reset',
            html:`<p><a href="http://localhost:8000/password/resetpassword/${token}">link</a> </p>`,
           
          }
          
        
          // module.exports={
          //   nodemailer:nodemailer,
          //   transporter:transporter,
        
          // }
        
        
        
        
        

 try{
       await  user.updateOne({resetLink:token})
 }catch(err){
    console.log(err);
 }

       transporter.sendMail(data,(err)=>{
         if(err)return console.log(err)
        })

        return res.status(200).json({ message: "password reset link sent successfully to your regestered email"})

    }catch(err){
        console.log(err);
    }

}

//  update using link in email

module.exports.updatepass=async(req,res)=>{
 
    try{
        
    const token=req.body.token;
    const password=req.body.password;
    console.log("@@@@@@@@@",token);

    if(token){
      let user  =  await User.findOne({resetLink:token})

      if(!user){
      
        res.status(400).json({message:'link is invalid or expired'});
      }
      
      console.log("%%%%%%%%%%%%%%%%%%%%%",user.id);
        const salt  =  await bcrypt.genSalt(10);
  const hashedPassword  = await bcrypt.hash(password, salt);
          
        await User.findByIdAndUpdate(user.id,{
          password:hashedPassword,
        });
        await user.save();
        return res.status(200).json({ message :'password reset successful'})
            

      
    }else{
      return res.send('error');
    }

}catch(err){

    res.status(500).json({ message:'server error'});
}
}
