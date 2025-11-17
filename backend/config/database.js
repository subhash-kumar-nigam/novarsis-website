const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,  
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

connection.connect(err => {
  if (err) {
    console.log("❌ MySQL Connection Error:", err);
  } else {
    console.log("✅ Connected to Railway MySQL!");
  }
});

module.exports = connection;
