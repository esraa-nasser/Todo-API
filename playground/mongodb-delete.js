
const { MongoClient, ObjectID } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log("We're unable to connect to mongoDB server");
    }
    console.log('Connected to MongoDB Succesfully ');
    const db = client.db('TodoApp');
    // db.collection('Todos')
    //     .findOneAndDelete({ text: 'Meet Someone' })
    //     .then(
    //         (docs) => {

    //             console.log(JSON.stringify(docs, undefined, 2))

    //         }
    //         , (err) => {
    //             console.log(err);
    //         }
    //     )
        
        db.collection('Users')
        .findOneAndDelete({ _id:new ObjectID('5cc63f41412170850edfd04b')})
        .then(
            (docs) => {

                console.log(JSON.stringify(docs, undefined, 2))

            }
            , (err) => {
                console.log(err);
            }
        )
    //client.close();
})