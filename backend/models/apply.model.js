const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Applyform = sequelize.define(
  "Applyform",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentCTC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expectedCTC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING, // will store file path (e.g. uploads/resume.pdf)
      allowNull: true,
    },
  },
  {
    tableName: "applyforms", // ✅ table name in phpMyAdmin
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Applyform;
