const Employee = require('../models/Employee');
const Passport = require('../models/Passport');

exports.create = async (body) => {
  const createdEmmployee = await Employee.create(body);
  return createdEmmployee;
}

exports.findAll = async () => {
  const employees = await Employee.findAll({
    include: {
      model: Passport,
      as: "passport"
    },
  });
  return employees;
}

exports.findAndCountAll = async (page, size) => {
  const employees = await Employee.findAndCountAll({
    limit: size,
    offset: page * size,
    include: {
      model: Passport,
      as: "passport"
    },
  });
  return employees;
}


exports.findById = async (employeeId) => {
  const employee = await Employee.findOne({
    where: {id: employeeId},
    include: {
      model: Passport,
      as: "passport"
    }
  });
  return employee;
}

exports.delete = async (employeeId) => {
  const deletedCount = await Employee.destroy({where: {id: employeeId}});
  return deletedCount;
}

exports.update = async(employeeId, body) => {
  const employee = await Employee.findOne({where: {id: employeeId}});
  employee.firstName = body.firstName;
  employee.lastName = body.lastName;
  employee.age = body.age;
  employee.hiringDate = body.hiringDate;
  employee.department = body.department;
  employee.salary = body.salary;
  employee.description = body.description;
  employee.imgURL = body.imgURL;
  employee.save();

  return employee;
}
