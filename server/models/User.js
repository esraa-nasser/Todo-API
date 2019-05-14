const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
console.log(token)
  user.tokens=user.tokens.concat([{access,token}])

  return user.save().then(() => {
    return token;
  });
};
UserSchema.statics.findByToken=function(token){
  var User=this;
  var decoded;
  try{
    decoded=jwt.verify(token,'abc123');
  }catch(e){
    return new Promise((resolve,reject)=>{ reject()}) // same as return Promise.reject()
    // ay 7aga hb3tha fl paramters bta3t reject hst5dmha hnak fi catch as e argument
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}
var User = mongoose.model('User', UserSchema);

module.exports = {User}

// const mongoose=require('mongoose');
// const validator =require('validator')
// const JWT=require('jsonwebtoken');
// var UserSchema=new mongoose.Schema({
//     email:{
//         type:String,
//         require:true,
//         minLength:1,
//         trim:true,
//         unique:true,
//         validate:{
//             validator:validator.isEmail,
//             message:'{value} is not a valid email'
//         }
//     },
//     password:{
//         type:String,
//         require:true,
//         minLength:6
//     },
//     tokens:[{
//         access:{
//             type:String,
//             require:true
//         },
//         token:{
//             type:String,
//             require:true
//         }
//     }]
// })
// UserSchema.methods.generateAuthToken=function(){
//     var user=this;
//     var access='auth';
//     var token=JWT.sign({access,_id:user._id.toHexString()},'123abc').toString();
//     //user.tokens.push({access,token})
//     user.tokens=user.tokens.concat([{access,token}])
//     return user.save().then(()=>
//     {
//         return token
//     })
// }
// var User=mongoose.model('User',UserSchema)

// module.exports={User}