const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/DbConfig.js');

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    orderItems: {
        allowNull: false,
        type: Sequelize.STRING
    },
}, {sequelize, modelName: 'orders'});

module.exports = Order;