const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,          // yamabiko.proxy.rlwy.net
  user: process.env.DB_USERNAME,      // root
  password: process.env.DB_PASSWORD,  // your password
  database: process.env.DB_DATABASE,  // railway
  port: 25233,                        // FIXED → Railway MySQL port
  ssl: {
    rejectUnauthorized: false
  }
});

connection.connect(err => {
  if (err) console.log("❌ MySQL Connection Error:", err);
  else console.log("✅ Connected to Railway MySQL!");
});

module.exports = connection;
