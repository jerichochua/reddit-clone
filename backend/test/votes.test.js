const app = require('../app');
const request = require('supertest');
const pool = require('../db/db');

afterAll((done) => {
  pool.end();
  done();
});

describe('votes endpoint', () => {
  describe('/votes', () => {
    it('should return all votes', (done) => {
      request(app).get('/api/v1/votes').expect(200, done);
    });
  });
});
