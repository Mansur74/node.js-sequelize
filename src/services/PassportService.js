const Country = require('../models/Country');
const Employee = require('../models/Employee');
const Passport = require('../models/Passport');

exports.findAll = async () => {
  const passports = await Passport.findAll({
    include: [
      {
        model: Employee,
        as: "employee"
      }, 
      {
        model: Country,
        as: "countries",
        
      }
    ]
  });
  return passports;
}

exports.findById = async (passportId) => {
  const passport = await Passport.findOne(
    { 
      where: { id: passportId }, 
      include: [
        {
          model: Employee,
          as: "employee"
        }, 
        {
          model: Country,
          as: "countries",
          through: { attributes: [] }
        }
      ]
    });
  return passport;
}

exports.create = async (passport, countries, employeeId) => {
  const createdPassport = await Passport.create({ ...passport, employeeId: employeeId });
  createdPassport.setCountries(countries);  
  return createdPassport;
}

exports.update = async (body, countries, passportId) => {
  const passport = await Passport.findOne({where: {id: passportId}});
  passport.id = body.id;
  passport.passportNumber = body.passportNumber;
  passport.validDate = body.validDate;
  passport.setCountries(countries);  
  passport.save()
  return passport;
}

exports.delete = async (passportId) => {
  const deletedCount = await Passport.destroy({ where: { id: passportId } });
  return deletedCount;
}
