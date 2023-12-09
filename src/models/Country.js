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
    type: DataTypes.STRING,
    allowNull: false
  },
  capitalCity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  population: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  imgURL: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Country