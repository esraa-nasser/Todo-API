// require('./config/config')
//root of our application
const express=require('express')
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb')
const _=require('lodash')
var {mongoose}=require('./DB/mongoose')
var {Todo}=require('./models/Todo')
var {User}=require('./models/User')
var {authenticate}=require('./middleware/authenticate')
var app=new express();
const port=process.env.PORT ||4000 ;
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
            res.status(400).send(err);
        })
    console.log(req.body)//body gets stored in the body parser
})
app.get('/todos',(req,res)=>{
    Todo.find().then((all)=>{
        res.send({all});
    },(err)=>{
        res.status(400).send({err});
    })
})
app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(ObjectID.isValid(id)){
        Todo.findById(id).then((todo)=>{
            if(todo)
                res.send({todo})
           else
               return res.status(404).send();
        }).catch((e)=>{res.status(400).send()})//400 the request is not valid
    }
    else{
        console.log('not valid')
       return res.status(404).send()
    }
   
})
app.delete('/todos/:id',(req,res)=>{
    var ID=req.params.id;
    if(!ObjectID.isValid(ID)){
        return res.status(404).send()
    }
    else{
        Todo.findByIdAndRemove(ID).then((res)=>{
            if(res){
             res.send({res})
            }
            else{
                return res.status(404).send()
            }
        }).catch((e)=>{
            res.status(400).send()       })
    }
})
app.patch('/todos/:id',(req,res)=>{
    var id =req.params.id;
    //patch is used for updating 
    //if user want to update todo he'll use patch
    //na 3ayz at7km fl7agat elly l user y2dr y3mlha update
    //y3ne my2drsh y3ml update ll ID 
    //hst5dm pick 3shan a7ddlo l 7agat elly y2dr yst5dmha w y3mlha update 
    //3mlt require l lodash 3shan a2dr ast5dm pick
    var body=_.pick(req.body,['text','completed'])
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    
        if(_.isBoolean(body.completed)&&body.completed){
            body.completedAt=new Data().getTime();
        }else{
            body.completed=false
            body.completedAt=' ';
        }
        Todo.findByIdAndUpdate(id,{$set:body},{new:true})//new : true de b7dd el behaviour bta3 findoneandupdate l2nha btrg3 l 2dem f na h2olha rg3ely l gded
        .then((todo)=>{
            if(todo){
                res.send(res)
            }
            else{
               return res.status(404).send()
            }
        }).catch((e)=>{
            res.status(400).send()
        })
    
})
//3ayz ab3t l token fl header bta3 l http response 
        //hdef .header --> dy bta5od two paramters key value pair
        //l 7aga elly 3ayz adefha wl Qema
        //lma b2olh x- da m3nah eny msh hst5dm l default header bta3 http l2 na h3ml custom header
app.post('/users', (req, res) => {
    console.log('helloooo')
            var body =req.body;
            console.log(body)
            var user = new User({email:body.email,password:body.password});  
            user.save().then(() => {
              return user.generateAuthToken();
            }).then((token) => {
              res.header('x-auth', token).send(user);
            }).catch((e) => {
              res.status(400).send(e);
              console.log(e)
            })
          });
          
app.get('/users/me',authenticate,(req,res)=>{
            res.send(req.user)
          })
app.listen(port,()=>{
    console.log(`connection started at port: ${port}`)
})
module.exports={app}