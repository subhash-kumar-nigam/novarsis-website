const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ✅ correct DB connection

const Contactus = sequelize.define(
  "Contactus",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "contactuss", // ✅ EXACT name from phpMyAdmin
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Contactus;
