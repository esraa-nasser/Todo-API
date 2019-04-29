const request = require('supertest');
const expect = require('expect');
const { app } = require('./../server')
const { Todo } = require('./../models/Todo')
const { User } = require('./../models/User')
const todos = [{
    text: 'First test todo'
  }, {
    text: 'Second test todo'
  }];
  
beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});
describe('GET /todos', () => {
    it('Should Get all Todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                
                expect(res.body.all.length).toBe(2);
            }).end(done);
    });
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
                Todo.find().then((all) => {
                    expect(all.length).toBe(3);
                    expect(all[2].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
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

