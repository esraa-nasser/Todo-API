//const {MongoClient,ObjectID} = require('mongodb');
//var id=new ObjectID();
//console.log(id)
const mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
     return console.log("We're unable to connect to mongoDB server");
    }
    console.log('Connected to MongoDB Succesfully ');
    const db=client.db('TodoApp')
    db.collection('Todos').insertOne({
        text:'Something to do',completed:false
    },(err,result)=>{ 
        if(err){
           return console.log("unable to insert Todo");
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });
    db.collection('Users').insertOne({
        text:'Esraa Nasser',age:23,location:'Alexandaria'
    },(err,result)=>{
        if(err){
           return console.log("unable to insert Todo");
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    })
    client.close();
})