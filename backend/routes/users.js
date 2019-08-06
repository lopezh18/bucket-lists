const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const { validateUserPost } = require('../middleware/validation');
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/authentication');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, OPTIONS } = require('../config');


router.post('/', validateUserPost, async function(req, res, next){
  try{
    req.body.password = await bcrypt.hash(req.body.password, 12);

    const results = await User.register(req.body);

    const token = jwt.sign({username: results.username }, SECRET, OPTIONS);
    return res.json({ token });
  } catch(e) {
    return next(e);
  }
});

router.get('/:username', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function(req, res, next){
  try{
    let userData = await User.getUser(req.params.username);
    return res.json(userData);
  } catch(e) {
    return next(e);
  }
});

module.exports = router;