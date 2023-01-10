const app = require('../app');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const pool = require('../db/db');

afterAll(async () => {
  await pool.query('DELETE FROM users WHERE username = $1', ['new_user']);
  pool.end();
});

describe('auth endpoints', () => {
  describe('/login', () => {
    it('should return a 422 for missing credentials', (done) => {
      request(app)
        .post('/api/v1/login')
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some((e) => e.message === 'Username is required')
          ).toBe(true);
          expect(
            res.body.errors.some((e) => e.message === 'Password is required')
          ).toBe(true);
        })
        .expect(422, done);
    });

    it('should return a 400 for wrong username', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({ username: 'wrong', password: 'Password1' })
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some(
              (e) => e.message === 'Username or password is incorrect'
            )
          ).toBe(true);
        })
        .expect(400, done);
    });

    it('should return a 400 for wrong password', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({ username: 'user', password: 'WrongPassword1' })
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some(
              (e) => e.message === 'Username or password is incorrect'
            )
          ).toBe(true);
        })
        .expect(400, done);
    });

    it('should return a token for valid credentials', (done) => {
      request(app)
        .post('/api/v1/login')
        .send({ username: 'user', password: 'Password1' })
        .expect((res) => {
          expect(res.body.token).toBeDefined();
          const { token } = res.body;
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          expect(decoded.username).toBe('user');
        })
        .expect(200, done);
    });
  });

  describe('/register', () => {
    it('should return a 422 for missing credentials', (done) => {
      request(app)
        .post('/api/v1/register')
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some((e) => e.message === 'Username is required')
          ).toBe(true);
          expect(
            res.body.errors.some((e) => e.message === 'Password is required')
          ).toBe(true);
        })
        .expect(422, done);
    });

    it('should return a 400 for existing username', (done) => {
      request(app)
        .post('/api/v1/register')
        .send({ username: 'user', password: 'Password1' })
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some((e) => e.message === 'Username already exists')
          ).toBe(true);
        })
        .expect(400, done);
    });

    it('should return a token for valid credentials', (done) => {
      request(app)
        .post('/api/v1/register')
        .send({ username: 'new_user', password: 'Password1' })
        .expect((res) => {
          expect(res.body.token).toBeDefined();
          const { token } = res.body;
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          expect(decoded.username).toBe('new_user');
        })
        .expect(200, done);
    });
  });
});
