const {SHA256}=require('crypto-js');
const JWT=require('jsonwebtoken');
var data={
    id:10
}
var token=JWT.sign(data,'123abc')
console.log('Token: ',token)
var decoded=JWT.verify(token,'123abc')
console.log("decoded: ",decoded)
// var message="Iam User No. 3";
// var hash=SHA256(message).toString();
// // console.log(`Message: ${message}`)
// // console.log(`Hashing: ${hash}`)
// var data={
//     id:4
// }
// var token={
//     data,hash:SHA256(JSON.stringify(data)+'Some Secrets').toString()
// }
// token.data.id=5;
// token.hash=SHA256(token.data).toString()
// var resultHash=SHA256(JSON.stringify(token.data)+'Some Secrets').toString();
// if(token.hash===resultHash){
//     console.log('Data was not Changed')
// }
// else{
//     console.log('data Was Changed, Never Trust it')
// }