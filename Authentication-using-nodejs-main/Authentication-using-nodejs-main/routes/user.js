const express = require('express');
const router = express.Router();
const { handleHomepage, handleSignup, } = require('../controller/user');

router.get('/', handleHomepage);
router.post('/signup', handleSignup);
module.exports = router;
