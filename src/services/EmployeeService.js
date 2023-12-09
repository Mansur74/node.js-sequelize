const Emmployee = require('../models/Employee');
const Passport = require('../models/Passport');

exports.create = async (body) => {
  const createdEmmployee = await Emmployee.create(body);
  return createdEmmployee;
}

exports.findAll = async () => {
  const employees = await Emmployee.findAll({
    include: {
      model: Passport,
      as: "passport"
    },
  });
  return employees;
}

exports.findById = async (employeeId) => {
  const employee = await Emmployee.findOne({
    where: {id: employeeId},
    include: {
      model: Passport,
      as: "passport"
    }
  });
  return employee;
}

exports.delete = async (employeeId) => {
  const deletedCount = await Emmployee.destroy({where: {id: employeeId}});
  return deletedCount;
}
