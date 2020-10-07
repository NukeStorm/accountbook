/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerconfig');

const { sequelize } = require('./models');

const indexRouter = require('./routes/index');
const contentRouter = require('./routes/content');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');

const app = express();

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
app.use('/api/', userRouter);
app.use('/api/', contentRouter);
app.use('/api/', categoryRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
