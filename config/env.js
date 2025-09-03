require('dotenv').config();

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://whaticket-frontend-ey2j.onrender.com';
const BACKEND_URL  = process.env.BACKEND_URL  || 'https://whaticket-backend-production-1d64.up.railway.app';

const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
const DB_HOST    = process.env.DB_HOST || process.env.MYSQLHOST || 'mysql.railway.internal';
const DB_PORT    = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);
const DB_USER    = process.env.DB_USER || process.env.MYSQLUSER || 'root';
const DB_PASS    = process.env.DB_PASS || process.env.MYSQLPASSWORD || '';
const DB_NAME    = process.env.DB_NAME || process.env.MYSQLDATABASE || 'railway';

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'CHANGE_ME_REFRESH';

module.exports = { FRONTEND_URL, BACKEND_URL, DB_DIALECT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET, JWT_REFRESH_SECRET };