const passport = require('passport');
const bcrypt = require('bcryptjs');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    },
    
    async function(req,email, password, done){
        try{
        // find a user and establish the identity
      const user= await  User.findOne({email: email});
      console.log(user)
      const validPassword = await bcrypt.compare(req.body.password, user.password);
          // console.log(user.password,password);
             if (!user ||(!validPassword)){
                return done(null, false);
         }

            return done(null, user);
        }catch(err){
            res.status(404).json('some error occured try again or contact us')
        }
    })
    
    


);


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
  const user=await  User.findById(id)

        console.log(user)

        return done(null, user);
    });



// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/loginpage');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
      console.log(req.user)
        res.locals.user = req.user;
        console.log("%%%%%%%%%%",req.user)
    }

    next();
}



module.exports = passport;