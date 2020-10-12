require('dotenv').config({ path: '.env' });

const { env } = process;

const development = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: 'accountbook',
  host: env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
};
const production = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: 'accountbook',
  host: env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
};
const test = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: 'accountbook',
  host: env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
};

module.exports = { development, production, test };
