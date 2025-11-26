const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Team = sequelize.define(
  "Team",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // file path or image URL
      allowNull: true,
    },
  },
  {
    tableName: "teams", // ✅ MySQL table name
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Team;
