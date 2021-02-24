const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
var port = process.env.PORT || 3000;
// create express application
var app = new express();


app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.use(cors());
app.use(bodyparser.json());

app.set('view engine','ejs');
app.set('views','./src/views');
// const userData=require("./src/model/userdata");
const userdata = require('./src/model/userdata');
const taskdata = require('./src/model/taskdata');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.slzuy.mongodb.net/task?retryWrites=true&w=majority',

    {   useNewUrlParser: true ,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    app.post('/register',function(req,res){
    
        console.log(req.body);
        var user={
            name:req.body.user.name,
            email:req.body.user.email,
            password:req.body.user.password,
        } 
        var user = new userdata(user);
        user.save();
        console.log(user);      
        })    
    
        var useremail='';
    app.post('/login',(req,res)=>{
         useremail= req.body.email;
        
        let userData =req.body;
        userdata.findOne({email: userData.email},(err,user)=>{
            if(err)
                {
                    console.log(err);
                }
            else{
                if(!user)
                    {
                        res.status(401).send('invalid email')
                    }
                else {
                   if(user.password != userData.password)
                    {
                        res.status(401).send('invalid password')
                    }
                else{                
                       
                        let token = "user"
                        res.status(200).send({token})
                        return useremail;
                     
                        
                       
                    }
                   
                }
            }
        })
      
    
    })
    app.get('/task', function(req,res){

        taskdata.find({email:useremail})
        .then(function(task){
           
            res.send(task)
            
        });
    });
    app.get('/task/done', function(req,res){
        taskdata.find({email:useremail,status:"Completed"})
        .then(function(task){
            res.send(task);
        })
    })
    app.get('/task/:id', function(req,res){
        const id= req.params.id;
        taskdata.findOne({_id:id})
        .then(function(sol){
            res.send(sol);
        });
    });
  
    app.post('/task/insert', function(req,res){
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS");
        var task = {
            email:req.body.task.email,
            newtask:req.body.task.newtask,
            due:req.body.task.due,
            status:req.body.task.status
        }
        var task = new taskdata(task);
        console.log(task)
        task.save();

    })
    app.put('/task/update/:id', function(req,res){
        const id = req.params.id;
        newtask=req.body.newtask;
        status=req.body.status;
        due=req.body.due
    taskdata.findByIdAndUpdate(id,{
        $set:{
            "newtask":newtask,
            "status":status,
            "due":due
        }
     }).then(function(){
         res.send();
         console.log('updated');
     })
    });
    app.delete('/task/delete/:id',(req,res)=>{
        id=req.params.id;
        taskdata.findByIdAndDelete({'_id':id})
        .then(()=>{
            console.log('task deleted');
            res.send
        })
    })
app.listen(port,()=>{console.log("server ready at"+port)});