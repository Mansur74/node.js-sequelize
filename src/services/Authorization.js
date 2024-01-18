const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let refreshTokens = [];

// middlewares

exports.signUp = async (req, res, next) => {
  const body = req.body;
  const existingUser = await User.findOne({ where: { email: body.email } });
  if (existingUser)
    return res.status(401).json({ success: false, message: "Email is already associated with an account" });

  else {
    const { password, ...user } = body;
    const hashedPassword = await bcrypt.hash(password, 15);
    User.create({ password: hashedPassword, ...user })
    next()
    return;
  }
}

exports.signInWithEmail = async (req, res, next) => {
  const body = req.body;
  const user = await User.findOne({ where: { email: body.email } });
  if (!user)
    return res.status(401).json({ success: false, data: null, message: "The user does not exist" });

  else {
    const emailIsValid = body.email === user.email;
    const passwordIsValid = await bcrypt.compare(body.password, user.password);

    if (!emailIsValid || !passwordIsValid)
      return res.status(403).json({ success: false, data: null, message: "Email or Password is not correct" });

    else {
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_REFRESH_EXPIRATION
      });

      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      req.result = {
        accessToken: accessToken,
        refreshToken: refreshToken
      };
      next();
      return;
    }
  }

}

exports.authorization = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ success: false, data: null, message: "Access token can not be empty or null" });

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, data: null, message: err.message });
    req.user = user;
    next();
    return;
  })
}

exports.getAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ success: false, data: null, message: "Refresh token can not be empty or null" });

  if (!refreshTokens.includes(token))
    return res.status(404).json({ success: false, data: null, message: "Refresh token does not exist" });

  jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, data: null, message: err.message });

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_REFRESH_EXPIRATION
    });

    req.accessToken = { accessToken: accessToken };
    next();
    return;
  })
}

exports.logout = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ success: false, message: "Refresh token can not be empty or null" });

  jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, message: err.message });

    refreshTokens = refreshTokens.filter((refreshToken) => refreshToken !== token);
    next();
    return;
  })

}
