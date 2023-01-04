const router = require('express').Router();
const auth = require('./auth');
const posts = require('./posts');
const users = require('./users');
const votes = require('./votes');

router.use('/', auth);
router.use('/posts', posts);
router.use('/users', users);
router.use('/votes', votes);

module.exports = router;
