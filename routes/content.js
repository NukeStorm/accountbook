/* eslint-disable radix */
/* eslint-disable no-unused-vars */
const express = require('express');
const Content = require('../models/content');

const router = express.Router();

router.post('/v1/content/add', async (req, res, next) => {
  const result = { res: true };
  // eslint-disable-next-line object-curly-newline
  const { date, category, amount, content, userid } = req.body;
  try {
    await Content.create({
      date,
      category: parseInt(category),
      amount: parseInt(amount),
      content,
      userid,
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    result.res = false;
    res.json(result);
  }
});

module.exports = router;
