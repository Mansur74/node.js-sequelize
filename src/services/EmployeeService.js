const Emmployee = require('../models/Employee');

exports.create = async (body) => {
  const createdEmmployee = await Emmployee.create(body);
  return createdEmmployee;
}

exports.delete = async (employeeId) => {
  const deletedCount = await Emmployee.destroy(employeeId);
  return deletedCount;
}

exports.findAll = async () => {
  const employees = await Emmployee.findAll();
  return employees;
}

exports.findById = async (employeeId) => {
  const employee = await Emmployee.findOne({where: {id: employeeId}});
  return employee;
}
