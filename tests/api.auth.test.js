const api = require('../routes');
const app = require('../App');
import request from 'supertest';

require('dotenv').config();

let url;
const port = process.env.PORT || 8080 ;

switch  (process.env.NODE_ENV){
    case "prod":
        url = "https://touristapi.herokuapp.com"
        break;
    default:
        url = `http://localhost:${port}`;
}

var server = request.agent(url);

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

