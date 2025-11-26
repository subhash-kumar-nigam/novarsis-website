const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ✅ Database connection

const Faq = sequelize.define(
  "Faq",
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "faqs", // ✅ MySQL table name
    timestamps: true, // adds createdAt & updatedAt
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Faq;
