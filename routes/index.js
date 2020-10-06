/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const User = require('../models/user');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
