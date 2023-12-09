const Country = require('../models/Country');
const Passport = require('../models/Passport');

exports.create = async (country) => {
  const createdCountry = await Country.create(country);
  return createdCountry;
}

exports.findAll = () => {
  const countries = Country.findAll({
    include: [{
      model: Passport,
      as: "passports",
      through: {
        attributes: []
      }
    },
  ]});
  return countries;
}

exports.findById = (countryId) => {
  const country = Country.findOne({where: {id: countryId}})
  return country;
}

exports.delete = (countryId) => {
  const deletedCount = Country.destroy({where: {id: countryId}});
  return deletedCount;
}
