const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: "sa",
  password: "deneme123",
  database: "SchoolDB",
  host: "localhost",
  dialect: 'mssql',
});

module.exports = sequelize