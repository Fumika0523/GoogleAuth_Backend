const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
// the order is important

const session = require('express-session');
const cors = require('cors')
const passport = require('passport')
require('./passport.Config')
const connection=require('./connection')
connection()

app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));//the browser will only allow this cross-origin request if we configure CORS + credentials:

app.use(express.json())
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize())
app.use(passport.session())

//8000
app.get('/',(req,res)=>{
   // res.send("hello world")
   if(!req.user)
    return res.json({loggedIn:false})
  res.json({loggedIn:true, user:req.user})
})


//Our Routing
//get call
//Login Start
app.get('/auth/google',
    // console.log("Test1")
    passport.authenticate('google', { scope: ['profile',"email"] })
)

//Callback URL // for suppose you get an error
app.get('/auth/google/callback',
    // console.log("Error")
    passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5174/homepage');
  }
)

app.listen(process.env.PORT,
    console.log("server is running at", process.env.PORT)
)

