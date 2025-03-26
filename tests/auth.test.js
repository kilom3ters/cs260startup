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

  it('should fail to fetch current user data without a token', async () => {
    const res = await request(app)
      .get('/api/user')
      .expect(401);
    expect(res.body).toHaveProperty('msg', 'Unauthorized');
  });

  it('should update user profilePic', async () => {
    const newPic = 'https://example.com/newpic.jpg';
    const res = await request(app)
      .put('/api/user/profilePic')
      .set('Cookie', `token=${token}`)
      .send({ profilePic: newPic })
      .expect(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('profilePic', newPic);
  });

  it('should update favorite game', async () => {
    const favoriteGame = { name: 'Super Mario', image: 'https://example.com/mario.jpg' };
    const res = await request(app)
      .put('/api/user/favoriteGame')
      .set('Cookie', `token=${token}`)
      .send({ favoriteGame })
      .expect(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.favoriteGame).toEqual(favoriteGame);
  });

  it('should update game categories', async () => {
    const gameCategories = [{ name: 'RPG Games', items: [] }];
    const res = await request(app)
      .put('/api/user/gameCategories')
      .set('Cookie', `token=${token}`)
      .send({ gameCategories })
      .expect(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.gameCategories).toEqual(gameCategories);
  });

  it('should update friends list', async () => {
    const friends = [{ name: 'Alice', image: 'https://example.com/alice.jpg' }];
    const res = await request(app)
      .put('/api/user/friends')
      .set('Cookie', `token=${token}`)
      .send({ friends })
      .expect(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.friends).toEqual(friends);
  });

  it('should log out successfully', async () => {
    const res = await request(app)
      .post('/logout')
      .set('Cookie', `token=${token}`)
      .expect(200);
    expect(res.body).toHaveProperty('msg', 'Logged out successfully');
  });
});
