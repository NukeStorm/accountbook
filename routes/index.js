/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const User = require('../models/user');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/main.html');
});
router.get('/calendar', (req, res, next) => {
  res.redirect('/calendar.html');
});
router.get('/statistics', (req, res, next) => {
  res.redirect('/statistics.html');
});
module.exports = router;
