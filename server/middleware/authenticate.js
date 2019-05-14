var {User}=require('./../models/User');
var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            //valid token but for some reason the query couldn't find document that matches the paramters we specified
            return Promise.reject()
        }
        req.user=user
        req.token=token
        next()
    }).catch((err)=>{
        return res.status(401).send()
    })
  }
  module.exports={authenticate}