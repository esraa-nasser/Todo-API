const {mongoose}=require('./../server/DB/mongoose');
const {Todo}=require('./../server/models/Todo');
const {ObjectID}=require('mongodb');
const {User}=require('./../server/models/User')

var User_Id='5cc6e8a4d4e3831287688579';

User.find({_id:User_Id}).then((res)=>{
    if(ObjectID.isValid(User_Id))
        return console.log('Valid ID ',res);
},(err)=>{
   return console.log('Unable to Find Obj')
}).catch((e)=>{
    console.log(e)
})
// var id = '5cc788b2a39e4a8c82635f78';
// Todo.find({_id:id}).then((todos)=>{
//     console.log('todos: ',todos)
// },(err)=>{
//     console.log('unable to find obj')
// })
// Todo.findOne({_id:id}).then((todos)=>{
// console.log('todos: ',todos)
// })

// Todo.findById(id).then((todo)=>{
//     console.log(todo);
// },(err)=>{
//     console.log(err);
// })