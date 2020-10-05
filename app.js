var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { sequelize } = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
