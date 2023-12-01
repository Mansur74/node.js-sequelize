const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  countryName: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  validDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
})

module.exports = Country