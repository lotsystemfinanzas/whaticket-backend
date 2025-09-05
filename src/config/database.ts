require("../bootstrap");

const dequote = (v?: string) =>
  (v ? v.replace(/^['"]|['"]$/g, "").trim() : v) as string | undefined;
const env = (k: string, fallback?: string) => dequote(process.env[k] ?? fallback);
const toInt = (v?: string, d = 0) => {
  const n = v ? parseInt(v, 10) : NaN;
  return Number.isFinite(n) ? n : d;
};

let host = env("DB_HOST", "mysql.railway.internal");
if (host && host.includes("${")) host = "mysql.railway.internal";

const port = toInt(env("DB_PORT"), 3306);

module.exports = {
  define: { charset: "utf8mb4", collate: "utf8mb4_bin" },
  dialect: env("DB_DIALECT", "mysql"),
  timezone: "-03:00",
  host,
  port,
  database: env("DB_NAME"),
  username: env("DB_USER"),
  password: env("DB_PASS"),
  logging: false,
  dialectOptions: { connectTimeout: 20000 },
  pool: { max: 10, min: 0, acquire: 60000, idle: 10000 },
  retry: { match: [/ETIMEDOUT/, /ECONNREFUSED/, /SequelizeConnectionError/], max: 5 }
};
