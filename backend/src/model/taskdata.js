const mongoose =require('mongoose')
const schema=mongoose.Schema;


const taskSchema = new schema({
    
    email: String,
    newtask: String,
    due: String,
    status:String
    

},{timestamps:true});
var taskdata=mongoose.model("taskData",taskSchema);

module.exports=taskdata;