const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/DbConfig.js');
const Order = require('./order.model.js');
class Customer extends Model {}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    email: {
        allowNull: false,
        unique: true,
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
    firstname: {
        allowNull: false,
        type: Sequelize.STRING
    },
    lastname: {
        allowNull: false,
        type: Sequelize.STRING
    },
    mobile_number: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
    },
}, {sequelize, modelName: 'customers'});

Customer.hasMany(Order);

module.exports = Customer;