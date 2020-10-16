/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
/* eslint-disable import/no-dynamic-require */

const Sequelize = require('sequelize');
const User = require('./user');
const Category = require('./category');
const Content = require('./content');
const CategoryType = require('./category_type');
const Payment = require('./payment');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
/* 모델 추가부분 */
db.User = User;
db.Category = Category;
db.Content = Content;
db.CategoryType = CategoryType;
db.Payment = Payment;

User.init(sequelize);
Payment.init(sequelize);
Category.init(sequelize);
CategoryType.init(sequelize);
Content.init(sequelize);

User.associate(db);
Category.associate(db);
CategoryType.associate(db);
Content.associate(db);

module.exports = db;
