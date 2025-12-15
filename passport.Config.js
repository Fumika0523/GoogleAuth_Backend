const passport = require('passport')
const User=require('./UserModel')
// "passport-google-oauth20": "^2.0.0"
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},

// Q: What is accessToken, refreshToken for ?
  async(accessToken, refreshToken, profile, cb)=>{
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
try{
  //Find
  let user=await User.findOne({googleId:profile.id})
  if(!user){
    user = await User.create({
      googleId:profile?.id,
      name:profile?.displayName,
      email:profile?.emails[0]?.value,
    })
  }
  //Create
  return cb(null,user)  //2arg

}catch(e){
  console.log(e)
}
})
)

passport.serializeUser(function(user, cb) {
 return cb(null,user._id)
});

// passport.deserializeUser(function(user, cb) {
//  return cb(null,user)
// });


passport.deserializeUser(async(id, cb)=> {
 try{
  const user = await User.findById(id)
  cb(null,user)
 }catch(e){
  cb(e,null)
 }
});

