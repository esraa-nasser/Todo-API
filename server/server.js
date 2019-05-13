//root of our application
var express=require('express')
var bodyParser=require('body-parser');
const {ObjectID}=require('mongodb')
var {mongoose}=require('./DB/mongoose')
var {Todo}=require('./models/Todo')
var {User}=require('./models/User')
var app=new express();
const port=process.env.PORT || 4000;
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
               return res.send({todo})
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
        Todo.findByIdAndRemove(D).then((res)=>{
            if(res){
            return res.status(200).send({res})
            }
            else{
                return res.status(404).send()
            }
        }).catch((e)=>{
            res.status(400).send()       })
    }
})
app.listen(port,()=>{
    console.log(`connection started at port: ${port}`)
})
module.exports={app}