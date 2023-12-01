const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Passport = sequelize.define('Passport', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  passportNumber: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  validDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
})

module.exports = Passport