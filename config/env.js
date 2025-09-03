require('dotenv').config();

const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
const DB_HOST = process.env.DB_HOST || process.env.MYSQLHOST || 'mysql.railway.internal';
const DB_PORT = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);
const DB_USER = process.env.DB_USER || process.env.MYSQLUSER || 'root';
const DB_PASS = process.env.DB_PASS || process.env.MYSQLPASSWORD || '';
const DB_NAME = process.env.DB_NAME || process.env.MYSQLDATABASE || 'railway';

// SSL por defecto si NO estás en la red interna
const DB_SSL = (process.env.DB_SSL || '').toString().toLowerCase() === 'true' || !/mysql\.railway\.internal/i.test(DB_HOST);
const DB_CONNECT_TIMEOUT = Number(process.env.DB_CONNECT_TIMEOUT || 20000);

module.exports = {
  DB_DIALECT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_SSL, DB_CONNECT_TIMEOUT
};
