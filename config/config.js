const env = require('./env');

module.exports = {
  production: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    logging: false
  },
  development: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    logging: true
  },
  test: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    logging: false
  }
};