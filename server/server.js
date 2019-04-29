//root of our application
var {mongoose}=require('./DB/mongoose')
var {Todo}=require('./models/Todo')
var {User}=require('./models/User')
var express=require('express')
var bodyParser=require('body-parser');
var app=new express();
app.use(bodyParser.json()); // Middleware
//we can now send JSON to express
app.post('/todos',(req,res)=>{
    var nTodo=new Todo({
        text:req.body.text
    });
    nTodo.save().then(
        (doc)=>{
            console.log('Todo object is saved');
            res.send(doc);
        },(err)=>{
            console.log('unable to save todo object');
            res.status(404).send(err);
        })
    console.log(req.body)//body gets stored in the body parser
})
app.listen(3000,()=>{
    console.log("connection started")
})
// var newTodo=new Todo({text:'Edit This Video'});
// newTodo.save().then((doc)=>{console.log('save Todo')},(err)=>{console.log(err.message)})
//  var newUser=new User({email:'esraa@example.com'});
//  newUser.save().then((doc)=>{console.log('saved User ',doc)},(err)=>{console.log(err)})