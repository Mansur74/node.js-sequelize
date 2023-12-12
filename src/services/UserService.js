const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

exports.signUp = async (body) => {
  const existingUser = await User.findOne({where: {email: body.email}});
  if(existingUser)
    return "Email is already associated with an account!";
  const { password, ...user } = body; 
  const hashedPassword = await bcrypt.hash(password, 15);
  await User.create({password: hashedPassword, ...user})
  return "User was created successfully!"
}

exports.signInWithEmail = async (body) => {
  const user = await User.findOne({where: {email: body.email}});
  if(!user)
    return "The user does not exist!";

  const emailIsValid = body.email === user.email;
  const passwordIsValid = await bcrypt.compare(body.password, user.password);
  
  if(!emailIsValid || !passwordIsValid)
    return "Email or Passport is not correct!";

  const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRATION)
  });
  
  return token;

}


