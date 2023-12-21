const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

let refreshTokens = [];

exports.signUp = async (body) => {
  const existingUser = await User.findOne({where: {email: body.email}});
  if(existingUser)
    return { success: false, message: "Email is already associated with an account", status: 403 }
  const { password, ...user } = body; 
  const hashedPassword = await bcrypt.hash(password, 15);
  await User.create({password: hashedPassword, ...user})
  return { success: true, message: "User was created successfully", status: 201 }
}

exports.signInWithEmail = async (body) => {
  const user = await User.findOne({where: {email: body.email}});
  if(!user)
    return { success: false, data: null, message: "The user does not exist", status: 401 }

  const emailIsValid = body.email === user.email;
  const passwordIsValid = await bcrypt.compare(body.password, user.password);
  
  if(!emailIsValid || !passwordIsValid)
    return { success: false, data: null, message: "Email or Password is not correct", status: 403 };

  const accessToken = jwt.sign({id: user.id}, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_REFRESH_EXPIRATION 
  });
  
  const refreshToken = jwt.sign({id: user.id}, process.env.JWT_REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  
  return { 
    success: false, 
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken
    },
    message: null, 
    status: 200
  };

}

exports.authorization = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ success: false, data: null, message: "Token can not be empty or null", status: 401 });

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, data: null, message: err.message , status: 403 });
    req.user = user;
    next();
    return;
  })
}

exports.getAccessToken = (req, res, next) =>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

    if (!token)
      return res.status(401).json({ success: false, data: null, message: "Token can not be empty or null" , status: 401 });

    if (!refreshTokens.includes(token))
      return res.status(404).json({ success: false, data: null, message: "Token does not exist" , status: 404 });

    jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
       return res.status(403).json({ success: false, data: null, message: err.message , status: 403 });

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_REFRESH_EXPIRATION
      });

      req.accessToken = {accessToken: accessToken};
      next();
      return;
    })
}

exports.logout = (token) => {
  refreshTokens = refreshTokens.filter((refreshToken) => refreshToken !== token);
  return { success: true, message: "Logged Out" , status: 200 };
}
