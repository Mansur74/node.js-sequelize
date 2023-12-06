const Country = require('../models/Country');
const Passport = require('../models/Passport');

exports.findAll = async () => {
  const passports = await Passport.findAll({include: [{
    model: Country,
    through: { attributes: [] }
  }]});
  return passports;
}

exports.findById = async (passportId) => {
  const passport = await Passport.findOne({where: {id: passportId}})
  return passport;
}

exports.create = async (passport, countries, employeeId) => {
  const createdPassport = await Passport.create({...passport, employeeId: employeeId});
  createdPassport.setCountries(countries);  
  return createdPassport;
}

exports.delete = async (passportId) => {
  const deletedCount = await Passport.destroy({where: {id: passportId}});
  return deletedCount;
}
