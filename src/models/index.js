const Passport = require('./Passport');
const Country = require('./Country');
const Employee = require('./Employee');
const { DataTypes } = require('sequelize');

exports.relate = () => {
  Employee.hasOne(Passport, {
    foreignKey: {
      name: 'employeeId',
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });
  Passport.belongsTo(Employee, {
    foreignKey: {
      name: 'employeeId',
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });

  Passport.belongsToMany(Country, { through: 'PassportCountry', foreignKey: 'passportId'});
  Country.belongsToMany(Passport, { through: 'PassportCountry', foreignKey: 'countryId'});

}