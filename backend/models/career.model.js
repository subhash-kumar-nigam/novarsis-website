const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Career = sequelize.define(
  "Career",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Full-Time", "Part-Time", "Internship", "Remote", "Contract"),
      allowNull: false,
      defaultValue: "Full-Time",
    },
    experience: {
      type: DataTypes.STRING, // example: "2-4 years"
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "careers", // ✅ MySQL table name
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Career;
