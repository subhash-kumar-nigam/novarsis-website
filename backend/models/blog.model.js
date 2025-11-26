const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Blog = sequelize.define(
  "Blog",
  {
    image: {
      type: DataTypes.STRING, // Path or URL of image
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY, // Stores only date (YYYY-MM-DD)
      allowNull: false,
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
    tableName: "blogs", // ✅ MySQL table name
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Blog;
