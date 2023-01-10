const app = require('../app');
const request = require('supertest');
const pool = require('../db/db');

afterAll((done) => {
  pool.end();
  done();
});

describe('users endpoints', () => {
  it('should return all posts for a valid user', (done) => {
    request(app).get('/api/v1/users/user').expect(200, done);
  });

  it('should return a 404 for a non-existent user', (done) => {
    request(app).get('/api/v1/users/invalid_user').expect(404, done);
  });
});
