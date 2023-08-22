const express=require('express');
const port=80;
const app=express();
const session=require('express-session');
const mongoose=require('mongoose');
const mongoStore=require('connect-mongo');
const passport=require('passport');
const passlocal=require('./config/passport')



app.use(express.json())
app.use(express.urlencoded({   
    extended: true,
}))  



mongoose.connect("mongodb://127.0.0.1:27017/signupDB", {useNewUrlParser : true, useUnifiedTopology : true})
.then(()=> {
    console.log("App is now connected to DB")
}).catch((err)=> {
    console.log(`${err}`);
})


app.set('view engine','ejs');
app.set('views',"./views")



app.use(session({
    name:'auth',
    secret:'something',
    saveUninitialized:false,
    resave:false,

    cookie:{

        maxAge:1000*60*100,
        store:mongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017",
                
            autoRemove: "disabled",

    }

)}
}))





  app.use(passport.initialize());
  app.use(passport.session());

  app.use(passport.setAuthenticatedUser)
  app.use('/',require('./route/index'));
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }

    console.log('server running')
}


);