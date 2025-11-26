const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gallery = sequelize.define('Gallery', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'galleries', // ✅ MySQL table name
  timestamps: true,       // Adds createdAt & updatedAt automatically
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Gallery;
