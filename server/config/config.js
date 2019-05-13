var env=process.env.NODE_ENV || 'development'
console.log('enviroment *********',env)
//in case we're on production,test Node_ENV will be set, if we're in development 'development will be set
if(env==='development'){
    process.env.PORT=4000;
    process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp'
}else if(env==='test'){
    process.env.PORT=4000;
    process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTest'
}