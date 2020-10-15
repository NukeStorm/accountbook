/* eslint-disable no-unused-vars */
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();
/* 회원가입 TODO:비지니스로직 분리후 userService.js로 옮기기 */
router.post('/v1/user/signup', async (req, res, next) => {
  const result = { res: true };
  const { userid, pw } = req.body;
  try {
    await User.create({
      userid,
      pw,
    });
    res.json(result);
  } catch (e) {
    result.res = false;
    res.json(result);
  }
});

router.post('/v1/auth/tokens', async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        id: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // jwt.sign('token내용', 'JWT secretkey')
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '10m' });
      return res.json({ user, token });
    });
  })(req, res);
});

router.post('/v1/auth/login', async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log(err, user);
    res.json({ user });
  })(req, res);
});

module.exports = router;
