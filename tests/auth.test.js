const request = require('supertest');
const app = require('../service/index.js');

describe('Authentication Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ user: 'testuser_temp', password: 'testpassword' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });
});
