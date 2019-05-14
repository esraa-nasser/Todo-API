const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb')
const { app } = require('./../server')
const { Todo } = require('./../models/Todo')
const { User } = require('./../models/User')
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    completed:true,completedAt:333
    
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});
describe('GET /todos', () => {
    // it('Should Get all Todos', (done) => {
    //     request(app)
    //         .get('/todos')
    //         .expect(200)
    //         .expect((res) => {
    //             expect(res.body.all.length).toBe(2);
    //         }).end(done);
    // });
});
describe('POST /todos', () => {
    it('Should create a new Todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((all) => {
                    expect(all.length).toBe(1);
                    expect(all[0].text).toBe(text)
                }).catch((e) => done(e)).done();
            }).catch(done)
    })
    it('Should not create a new Todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((all) => {
                    expect(all.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    })
})

describe('GET /todos/:id', () => {
    it('Should get a Todo with this _id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done)
    })
    it('Should return 404 when not exist', (done) => {
        var hexId=new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    })
    it('Should return 400 when not Valid ID', (done) => {
        request(app)
            .get(`/todos/5cc9afbcbb9ac975787f47e6b`)
            .expect(404)
            .end(done)
    })

})
describe('Delete /todos/:id', () => {
    it('Should remove a Todo with this _id', (done) => {

        request(app)
            .delete(`/todos/${todos[1]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(todos[1]._id.toHexString());
            }).end((err,res)=>{
                if(err){
                    return done(err)
                }
            })
            Todo.findById(todos[1]._id.toHexString()).then((res)=>{
                expect(res).toNotExist();
                donr()
            }).catch((err)=>done(err))
    })
    it('Should return 404 when not exist', (done) => {
        var hexId=new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    })
    it('Should return 400 when not Valid ID', (done) => {
        request(app)
            .delete(`/todos/5cc9afbcbb9ac975787f47e6b`)
            .expect(404)
            .end(done)
    })

   

})
describe('PATCH /todos/:id',()=>{
    it('Should Update the Todo',(done)=>{
        var text="this should by new text"
        var hexId=todos[0]._id.toHexString()
        request(app).patch(`/todos/:${hexId}`).send({completed:true,text})
        .expect(200).expect((res)=>{
            expect(res.body.todo.text).toBe(text)
            expect(res.body.todo.completedAt).toBe('number')
            expect(res.body.todo.completed).toBeA(true)
        })
        .end(done)

    })
    it('Should Clear completedAt when Todo is not Completed',(done)=>{
        var hexId=todos[1]._id.toHexString()
        var text="this should by new text from 2nd test"
        request(app).patch(`/todos/:${hexId}`).send({completed:false,text})
        .expect(200).expect((res)=>{
            expect(res.body.todo.text).toBe(text)
            expect(res.body.todo.completedAt).toNotExist()
            expect(res.body.todo.completed).toBeA(false)
        })
        .end(done)

    })

})