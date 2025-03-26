const request = require('supertest');
const app = require('../service/index.js');

describe('API Endpoints', () => {
  let token;
  let testUsername = `testuser_${Date.now()}`;

  it('should fetch a random quote', async () => {
    const res = await request(app)
      .get('/api/quote')
      .expect(200);
    expect(res.body).toHaveProperty('quote');
    expect(res.body).toHaveProperty('author');
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ user: testUsername, password: 'testpassword' })
      .expect(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', testUsername);
    token = res.body.token;
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/login')
      .send({ user: testUsername, password: 'testpassword' })
      .expect(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', testUsername);
    token = res.body.token;
  });

  it('should fetch current user data with a valid token', async () => {
    const res = await request(app)
      .get('/api/user')
      .set('Cookie', `token=${token}`)
      .expect(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', testUsername);
  });

  it('should log out successfully', async () => {
    const res = await request(app)
      .post('/logout')
      .set('Cookie', `token=${token}`)
      .expect(200);
    expect(res.body).toHaveProperty('msg', 'Logged out successfully');
  });
});
