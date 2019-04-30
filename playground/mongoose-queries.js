const {mongoose}=require('./../server/DB/mongoose');
const {Todo}=require('./../server/models/Todo');
const {objectID}=require('mongodb');

var id = '5cc788b2a39e4a8c82635f78';
Todo.find({_id:id}).then((todos)=>{
    console.log('todos: ',todos)
},(err)=>{
    console.log('unable to find obj')
})
Todo.findOne({_id:id}).then((todos)=>{
console.log('todos: ',todos)
})

Todo.findById(id).then((todo)=>{
    console.log(todo);
},(err)=>{
    console.log(err);
})