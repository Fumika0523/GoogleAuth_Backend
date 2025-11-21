const passport = require('passport')
// "passport-google-oauth20": "^2.0.0"
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  (accessToken, refreshToken, profile, cb)=>{
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
return cb(null,profile)  //2arg
})
)

passport.serializeUser(function(user, cb) {
return cb(null,user)
});

passport.deserializeUser(function(id, cb) {
 return cb(null,user)
});