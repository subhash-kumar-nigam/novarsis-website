const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ensure correct path to your connection file

const Users = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // required field
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true, // optional field
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true, // optional field
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, // optional field
  },
}, {
  tableName: 'users', // optional, for clarity
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Users;
