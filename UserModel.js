const mongoose=require('mongoose')
const userScehema=new mongoose.Schema({
    googleId:{type:String},
    name:{type:String},
    email:{type:String},
})

module.exports=mongoose.model("User",userScehema)