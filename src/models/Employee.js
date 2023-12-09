const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hiringDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imgURL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
})

module.exports = Employee