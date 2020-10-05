require('dotenv').config({ path: '.env' });

const env = process.env;

const development = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: 'accountbook',
  host: env.DB_HOST,
  dialect: 'mysql',
};
const production = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: 'accountbook',
  host: env.DB_HOST,
  dialect: 'mysql',
};
const test = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: 'accountbook',
  host: env.DB_HOST,
  dialect: 'mysql',
};

module.exports = { development, production, test };
