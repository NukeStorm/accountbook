/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const User = require('../models/user');

/* 회원가입 TODO:비지니스로직 분리후 userService.js로 옮기기 */
router.post('/v1/user', async (req, res, next) => {
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

module.exports = router;
