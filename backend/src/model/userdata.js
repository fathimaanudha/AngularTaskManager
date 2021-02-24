const mongoose =require('mongoose')
const schema=mongoose.Schema;


const userSchema = new schema({
    name:String,
    email: String,
    password: String,
    phone: String
    

},{timestamps:true});
var userdata=mongoose.model("UserloginData",userSchema);

module.exports=userdata;