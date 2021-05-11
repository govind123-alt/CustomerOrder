const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/DbConfig.js');

class Admin extends Model {}

Admin.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    phone: {
        allowNull: false,
        type: Sequelize.STRING
    },
}, {sequelize, modelName: 'admin'});

module.exports = Admin;