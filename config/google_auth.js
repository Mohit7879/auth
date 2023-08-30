const passport=require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User=require('../model/user');

passport.use(new GoogleStrategy({
    clientID: "882307091616-bsbe7rob3jkfrn45gpd90hvn0c9pm37o.apps.googleusercontent.com",
    clientSecret:"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" ,
    callbackURL: "http://localhost:8000/signin/auth/google"
  },
 async function(accessToken, refreshToken, profile,done ) {
    console.log("&&&&&&&&&&&&&&",profile)
        //find a user
      const user=  await User.findOne({ email: profile?.emails[0]?.value }).exec();
          

            console.log(profile);
if (user) {
                //if found, set this user as req.user
                return done(null, user);
            } else {
                //if not found, create the user and set is as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes.toString('hex')
                }, function (error, user) {
                    if (error) {
                        console.log('ERROR in creating user by passprot', error);
                        return;
                    }
                    return done(null, user);
                });
            }
        }));
    


module.exports = passport;
 