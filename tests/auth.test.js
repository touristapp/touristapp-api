const api = require('../routes');
const app = require('../App');
import request from 'supertest';
// require('dotenv').config();
// const port = process.env.PORT || 8080 ;
// var server = request.agent(`https://touristapi.herokuapp.com/${port}`);
var server = request.agent("http://localhost:8080");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImJlbmphbTEiLCJlbWFpbCI6ImJlbmphbTFAZ21haWwuY29tIiwiaWF0IjoxNTYxODIzODcxfQ.9xN4mTZ4IyoW1HTBW-6pDq9Ox4b4cf0VRZTm-yyZN7Y"

const user = {
    email: "benbeni@gmail.com",
    password: "1234567",
}

// var token = '';

// before (function(done){
//     request(app)
//         .post('/api/auth/login')
//         .send({
//             email: user.email,
//             password: user.password
//           })
//         .expect(200)
//         .end(function(err, res) {
//             console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@")
//             console.log(res)
//             token = res.body.meta.token;
//             done();
//         })
// });
// before (function(done){
//     request(app)
//         .post('/api/auth/login')
//         .send({
//             email: user.email,
//             password: user.password
//           })
//         .expect(200)
//         .end(function(err, res) {
//             if (err) { return done(err)}

//             console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@")
//             console.log(res.header)
//             token = res.body.meta.token;
//             done();
//         })
// });

describe('GET admin/users', () => {
    it('respond with json containing a list of all users', async (done) => {
        console.log("################")
        const response= server
        await response.get('/api/user/7')
            // .set('Accept', 'application/json', 'Authorization', 'Bearer ' + token)
            // .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                console.log("----- RES -----")
                console.log(res)
                done()
            })
            .catch((err) => {
                console.log("------- ERR --------")
                // console.log(err);
                return done(err)
            })
            // done()
    });
});

