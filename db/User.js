const mongoose =require('mongoose');

const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    score:{type: String,default:0}
});

module.exports=mongoose.model("users",userSchema);