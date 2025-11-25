const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("🎯 Database Connected Successfully 🚀"))
  .catch((err) => console.error("❌ Database Connection Failed:", err.message));

module.exports = sequelize;
