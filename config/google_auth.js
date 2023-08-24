const passport=require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require('../model/user');

passport.use(new GoogleStrategy({
    clientID: "356402534468-1c7lpabmit074ussgpiju649psdgo49a.apps.googleusercontent.com",
    clientSecret:"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" ,
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
 const user=  await  new User({ googleId: profile.id });
    
   return cb(err,user);

  }
));