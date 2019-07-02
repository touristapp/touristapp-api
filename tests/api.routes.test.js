const api = require('../routes');
const app = require('../App');
import request from 'supertest';

// TESTS THE API
describe('Test the API', ()=>{
  test('API Router should be defined', () => {
    expect(api).toBeDefined();
  });
  test('API Router should be an object', () => {
    expect(typeof api).toBe("object");
  });
  test('API root path should return 200', () => {
    return request(app).get('/').expect(200);
  });
  test('API /api endpoint should return 200', () => {
    // console.log(request(app).get('/api').expect(400));
    return request(app).get('/api').expect(200);
  });
});