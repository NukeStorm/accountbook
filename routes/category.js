/* eslint-disable radix */
/* eslint-disable no-unused-vars */
const express = require('express');
const CategoryType = require('../models/category_type');
const Category = require('../models/category');

const router = express.Router();

router.post('/v1/category/type/add', async (req, res, next) => {
  const result = { res: true };
  const { name } = req.body;
  console.log(name);
  try {
    await CategoryType.create({
      name,
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    result.res = false;
    res.json(result);
  }
});
router.get('/v1/category/type/list', async (req, res, next) => {
  const result = { res: null };
  try {
    result.res = await CategoryType.findAll();
    res.json(result);
  } catch (e) {
    console.log(e);
    result.res = [];
    res.json(result);
  }
});

router.post('/v1/category/add', async (req, res, next) => {
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

router.get('/v1/category/listall', async (req, res, next) => {
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

router.get('/v1/category/list/:type', async (req, res, next) => {
  const result = { res: null };
  const { type } = req.params;
  const sql = {
    where: { type: parseInt(type) },
  };
  try {
    result.res = await Category.findAll(sql);
    res.json(result);
  } catch (e) {
    console.log(e);
    result.res = false;
    res.json(result);
  }
});

module.exports = router;
