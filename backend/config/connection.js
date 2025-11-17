const { Sequelize } = require("sequelize");
const config = require("./database");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    dialectOptions: config.dialectOptions
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ Sequelize Connected Successfully!"))
  .catch(err => console.error("❌ Sequelize Connection Error:", err));

module.exports = sequelize;
