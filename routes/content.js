/* eslint-disable radix */
/* eslint-disable no-unused-vars */
const express = require('express');
const { Op } = require('sequelize');
const Content = require('../models/content');
const Category = require('../models/category');
const CategoryType = require('../models/category_type');

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
router.get('/v1/content/list/currentmonth/:date', async (req, res, next) => {
  const result = { res: null };
  const { date } = req.params;

  // 해당 월의 1일
  const currentMonthStartDate = new Date(date);
  currentMonthStartDate.setDate(1);
  // 해당월 다음달 1일에서 1을 빼서 시작월의 마직막 날로 설정
  const nextMonthStartDate = new Date(currentMonthStartDate);
  nextMonthStartDate.setMonth(currentMonthStartDate.getMonth() + 1);
  nextMonthStartDate.setDate(nextMonthStartDate.getDate() - 1);

  const sql = {
    order: [['date', 'DESC']],
    include: [
      {
        model: Category,
        required: true,
        include: [{ model: CategoryType, required: true }],
      },
    ],
    where: { date: { [Op.between]: [currentMonthStartDate, nextMonthStartDate] } },
    attributes: ['idx', 'date', 'content', 'amount', 'userid'],
  };
  try {
    result.res = await Content.findAll(sql);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json(result);
  }
});
module.exports = router;
