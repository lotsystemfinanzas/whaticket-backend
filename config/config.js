const env = require('./env');

const base = {
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT,
  logging: false,
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  dialectOptions: {
    connectTimeout: env.DB_CONNECT_TIMEOUT,
    ...(env.DB_SSL ? { ssl: { require: true, rejectUnauthorized: false } } : {})
  }
};

module.exports = {
  production: base,
  development: { ...base, logging: true },
  test: base
};
