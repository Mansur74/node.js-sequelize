const Passport = require('../models/Passport');

exports.findAll = () => {
  const passports = Passport.findAll();
  return passports;
}

exports.findById = (passportId) => {
  const passport = Passport.findOne({where: {id: passportId}})
  return passport;
}

exports.create = (passport, employeeId) => {
  console.log({...passport, employeeId: employeeId});
  const createdPassport = Passport.create({...passport, employeeId: employeeId});
  return createdPassport;
}
