const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

let refreshTokens = [];

exports.getUserById = async (userId) => {
  const user = await User.findOne({where: {id: userId}});
  return user;
}

exports.signUp = async (body) => {
  const existingUser = await User.findOne({where: {email: body.email}});
  if(existingUser)
    throw { name:"EmailAlreadyExists", message: "Email is already associated with an account!"};
  const { password, ...user } = body; 
  const hashedPassword = await bcrypt.hash(password, 15);
  await User.create({password: hashedPassword, ...user})
  return "User was created successfully!";
}

exports.signInWithEmail = async (body) => {
  const user = await User.findOne({where: {email: body.email}});
  if(!user)
    throw { error:"UserDoesNotExist", message: "The user does not exist!"}

  const emailIsValid = body.email === user.email;
  const passwordIsValid = await bcrypt.compare(body.password, user.password);
  
  if(!emailIsValid || !passwordIsValid)
    throw { name:"IncorrectEmailOrPassword", message: "Email or Password is not correct!"};

  const accessToken = jwt.sign({id: user.id}, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_REFRESH_EXPIRATION 
  });
  
  const refreshToken = jwt.sign({id: user.id}, process.env.JWT_REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  
  return {accessToken: accessToken, refreshToken: refreshToken};

}

exports.verifyAccessToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: "Token can not be empty or null" });

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: err.message });
    req.user = user;
    next();
  })
}

exports.getAccessToken = (req, res, next) =>{
  const token = req.body.refreshToken;
    if (!token)
      return res.status(401).json({message: "Token can not be empty or null"});

    if (!refreshTokens.includes(token))
      return res.status(403).json({message: "Token does not exist"});

    jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
       return res.status(403).json({ message: err.message });

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_REFRESH_EXPIRATION
      });

      req.accessToken = {accessToken: accessToken};
      next();
    })
}

exports.logout = (token) => {
  refreshTokens = refreshTokens.filter((refreshToken) => refreshToken !== token);
  return "Logged Out";
}
