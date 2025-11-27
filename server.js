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

app.use(cors())
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
    res.send("hello world")
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
    res.redirect('/');
  }
)

app.listen(process.env.PORT,
    console.log("server is running at", process.env.PORT)
)

