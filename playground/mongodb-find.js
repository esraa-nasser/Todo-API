
const {MongoClient,ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
      console.log("We're unable to connect to mongoDB server");
    }
    console.log('Connected to MongoDB Succesfully ');
    const db=client.db('TodoApp');
    db.collection('Todos')
    .find()
    .count()
    //.toArray()
    .then(
        (docs)=>{
           
                console.log(JSON.stringify(docs,undefined,2))
           
        }
        ,(err)=>{console.log(err);})   
    client.close();
})