const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Service = sequelize.define(
  "Service",
  {
    image: {
      type: DataTypes.STRING, // Path or URL of image
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "services", // ✅ MySQL table name
    timestamps: true, // adds createdAt and updatedAt
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Service;
