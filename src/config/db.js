const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: "sa",
  password: "#Deneme123",
  database: "EmployeeDB",
  host: "db",
  dialect: 'mssql',
  port: 1433
});

module.exports = sequelize