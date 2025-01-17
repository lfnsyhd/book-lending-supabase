// models/shipment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust to your DB config

const Shipment = sequelize.define('Shipment',
{
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemDetails: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Shipment;
