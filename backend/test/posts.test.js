const app = require('../app');
const request = require('supertest');
const pool = require('../db/db');

afterAll(async () => {
  await pool.query('DELETE FROM posts WHERE title = $1', ['New Test Post']);
  await pool.query('DELETE FROM comments WHERE content = $1', [
    'New test comment',
  ]);
  await pool.query('DELETE FROM comments WHERE content = $1', [
    'Edited test comment',
  ]);
  pool.end();
});

describe('posts endpoints', () => {
  it('should return all posts', (done) => {
    request(app).get('/api/v1/posts').expect(200, done);
  });

  it('should return a single post', (done) => {
    request(app).get('/api/v1/posts/1').expect(200, done);
  });

  it('should return a 400 for a non-integer post ID', (done) => {
    request(app).get('/api/v1/posts/a').expect(400, done);
  });

  it('should return a 404 for a non-existent post', (done) => {
    request(app).get('/api/v1/posts/999').expect(404, done);
  });

  it('should fail to create a post without credentials', (done) => {
    request(app).post('/api/v1/posts').expect(403, done);
  });

  it('should return all comments for a post', (done) => {
    request(app).get('/api/v1/posts/1/comments').expect(200, done);
  });

  it('should return all votes for a post', (done) => {
    request(app).get('/api/v1/posts/1/votes').expect(200, done);
  });

  it('should return a 401 for an invalid token', (done) => {
    request(app)
      .post('/api/v1/posts')
      .set('Authorization', 'Bearer invalidtoken')
      .expect(401, done);
  });

  describe('with credentials', () => {
    let token;

    beforeAll(async () => {
      const res = await request(app).post('/api/v1/login').send({
        username: 'user',
        password: 'Password1',
      });
      token = res.body.token;
    });

    it('should return a 422 for missing title', (done) => {
      request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ content: 'Content' })
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some(
              (e) => e.message === 'Title must have at least 3 characters'
            )
          ).toBe(true);
        })
        .expect(422, done);
    });

    it('should return a 422 for missing content', (done) => {
      request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Title', type: 'text' })
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some(
              (e) => e.message === 'Content must have at least 3 characters'
            )
          ).toBe(true);
        })
        .expect(422, done);
    });

    it('should return a 422 for a title that is too long', (done) => {
      const longTitle = 'a'.repeat(256);
      request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: longTitle, content: 'Content' })
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some(
              (e) => e.message === 'Title must have at most 128 characters'
            )
          ).toBe(true);
        })
        .expect(422, done);
    });

    it('should return a 422 for content that is too short', (done) => {
      request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Title', type: 'text', content: 'a' })
        .expect((res) => {
          expect(res.body.errors).toBeDefined();
          expect(
            res.body.errors.some(
              (e) => e.message === 'Content must have at least 3 characters'
            )
          ).toBe(true);
        })
        .expect(422, done);
    });

    it('should create a post successfully', (done) => {
      request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'New Test Post', type: 'text', content: 'Content' })
        .expect((res) => {
          expect(res.body.title).toBe('New Test Post');
          expect(res.body.content).toBe('Content');
        })
        .expect(201, done);
    });

    it('should return a 404 when deleting a non-existent post', (done) => {
      request(app)
        .delete('/api/v1/posts/999')
        .set('Authorization', `Bearer ${token}`)
        .expect(404, done);
    });

    it('should delete a post successfully', async () => {
      const res = await request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'New Test Post To Delete',
          type: 'text',
          content: 'Content',
        });

      const postId = res.body.id;

      await request(app)
        .delete(`/api/v1/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
    });

    describe('comments', () => {
      it('should create a comment successfully', (done) => {
        request(app)
          .post('/api/v1/posts/1')
          .set('Authorization', `Bearer ${token}`)
          .send({ content: 'New test comment' })
          .expect((res) => {
            expect(res.body.message).toBe('Comment created');
          })
          .expect(201, done);
      });

      it('should return a 422 for a comment with no content', (done) => {
        request(app)
          .post('/api/v1/posts/1')
          .set('Authorization', `Bearer ${token}`)
          .send({ content: '' })
          .expect((res) => {
            expect(res.body.errors).toBeDefined();
            expect(
              res.body.errors.some(
                (e) => e.message === 'Comment cannot be empty'
              )
            ).toBe(true);
          })
          .expect(422, done);
      });

      it('should return a 422 for a comment that is too long', (done) => {
        const longComment = 'a'.repeat(2049);
        request(app)
          .post('/api/v1/posts/1')
          .set('Authorization', `Bearer ${token}`)
          .send({ content: longComment })
          .expect((res) => {
            expect(res.body.errors).toBeDefined();
            expect(
              res.body.errors.some(
                (e) => e.message === 'Comment must have at most 2048 characters'
              )
            ).toBe(true);
          })
          .expect(422, done);
      });

      it('should edit a comment successfully', async () => {
        const res = await request(app)
          .post('/api/v1/posts/1')
          .set('Authorization', `Bearer ${token}`)
          .send({ content: 'New test comment to edit' });

        const commentId = res.body.id;

        await request(app)
          .put(`/api/v1/posts/1/comments/${commentId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ content: 'Edited test comment' })
          .expect(204);
      });

      it('should delete a comment successfully', async () => {
        const res = await request(app)
          .post('/api/v1/posts/1')
          .set('Authorization', `Bearer ${token}`)
          .send({ content: 'New test comment to delete' });

        const commentId = res.body.id;

        await request(app)
          .delete(`/api/v1/posts/1/comments/${commentId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(204);
      });
    });

    describe('votes', () => {
      it('should upvote a post successfully', (done) => {
        request(app)
          .post('/api/v1/posts/1/upvote')
          .set('Authorization', `Bearer ${token}`)
          .expect((res) => {
            expect(res.body.vote).toBe(1);
          })
          .expect(201, done);
      });

      it('should downvote a post successfully', (done) => {
        request(app)
          .post('/api/v1/posts/1/downvote')
          .set('Authorization', `Bearer ${token}`)
          .expect((res) => {
            expect(res.body.vote).toBe(-1);
          })
          .expect(201, done);
      });

      it('should unvote a post successfully', async () => {
        await request(app)
          .post('/api/v1/posts/2/upvote')
          .set('Authorization', `Bearer ${token}`);

        await request(app)
          .post('/api/v1/posts/2/unvote')
          .set('Authorization', `Bearer ${token}`)
          .expect(201);
      });
    });
  });
});
