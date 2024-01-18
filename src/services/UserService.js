const User = require("../models/User")

exports.getUserById = async (userId) => {
  const user = await User.findOne({where: {id: userId}});
  return user;
}