const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');

const Lending = sequelize.define('Lending', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Lending.belongsTo(Book, {
  foreignKey: 'bookId',
  onDelete: 'CASCADE',
});

module.exports = Lending;
