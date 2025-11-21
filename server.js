const express = require('express')
const app = express()
const dotenv = require('dotenv')
const session = require('express-session');
const cors = require('cors')
const passport = require('passport')

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
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
app.get('/auth/google',()=>{
    console.log("Test1")
})

//Callback URL
app.get('/auth/google/callback',()=>{
    console.log("Test2")
})

app.listen(process.env.PORT,()=>{
    console.log("server is running at", process.env.PORT)
})

