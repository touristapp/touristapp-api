const api = require('../routes');
const app = require('../App');
import request from 'supertest';
// require('dotenv').config();
// const port = process.env.PORT || 8080 ;
// var server = request.agent(`https://touristapi.herokuapp.com/${port}`);
var server = request.agent("http://localhost:8080");

const user = {
    email: "benbeni@gmail.com",
    password: "1234567",
}

var token = '';

beforeAll((done) => {
    server
        .post('/api/auth/login')
        .send({
            email: user.email,
            password: user.password
          })
        .expect(200)
        .end(function(err, res) {
            if (err){
                done(err);
            }
            token = res.body.meta.token;
            done();
        })
});

describe('GET admin/users', () => {
    it('respond with json containing a list of all users', async (done) => {
        await server.get('/api/user/7')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                done()
            })
            .catch((err) => {
                return done(err)
            })
    });
});

