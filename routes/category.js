/* eslint-disable radix */
/* eslint-disable no-unused-vars */
const express = require('express');
const CategoryType = require('../models/category_type');
const Category = require('../models/category');

const router = express.Router();

router.get('/v1/category/type/list', async (req, res, next) => {
  const result = { res: null };
  try {
    result.res = await CategoryType.findAll();
    res.json(result);
  } catch (e) {
    console.log(e);
    result.res = false;
    res.json(result);
  }
});

router.post('/v1/category', async (req, res, next) => {
  const result = { res: true };
  const { content, type } = req.body;
  console.log(content);

  try {
    await Category.create({
      content,
      // eslint-disable-next-line radix
      type: parseInt(type),
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    result.res = false;
    res.json(result);
  }
});

router.get('/v1/category/list', async (req, res, next) => {
  const result = { res: null };

  try {
    result.res = await Category.findAll();
    res.json(result);
  } catch (e) {
    console.log(e);
    result.res = false;
    res.json(result);
  }
});

module.exports = router;
