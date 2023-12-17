const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: "sa",
  password: "deneme123",
  database: "EmployeeDB",
  host: "localhost",
  dialect: 'mssql',
  port: 1433
});

module.exports = sequelize