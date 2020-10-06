/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
/* eslint-disable import/no-dynamic-require */

const Sequelize = require('sequelize');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
/* 모델 추가부분 */
db.User = User;

User.init(sequelize);

module.exports = db;
