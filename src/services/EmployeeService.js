const Emmployee = require('../models/Employee');
const Passport = require('../models/Passport');

exports.create = async (body) => {
  const createdEmmployee = await Emmployee.create(body);
  return createdEmmployee;
}

exports.delete = async (employeeId) => {
  const deletedCount = await Emmployee.destroy(employeeId);
  return deletedCount;
}

exports.findAll = async () => {
  const employees = await Emmployee.findAll({
    include: Passport
  });
  return employees;
}

exports.findById = async (employeeId) => {
  const employee = await Emmployee.findOne({where: {id: employeeId}});
  return employee;
}
