const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT,
  logging: false,
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  dialectOptions: {
    connectTimeout: env.DB_CONNECT_TIMEOUT,
    ...(env.DB_SSL ? { ssl: { require: true, rejectUnauthorized: false } } : {})
  }
});

module.exports = { sequelize };
