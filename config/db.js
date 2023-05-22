const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  // port: process.env.PORT || 3306 //development,
  database: process.env.DB_DATABASE || "db_ieee",
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = { pool };
