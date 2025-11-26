const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('admin', {
    name: {
        type: DataTypes.STRING 
    },
    username: {
        type: DataTypes.STRING 
    },
    password: {
        type: DataTypes.STRING 
    },
    lastLogin:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.STRING
    }
    
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}); 
module.exports = Admin;