const express = require('express');
const router = express.Router();
const UserService = require("../services/UserService");
const Authorization = require("../services/Authorization");
const jwt = require("jsonwebtoken");

router.post('/sign-up', async (req, res) => {
  try {
    const user = req.body;
    const result = await Authorization.signUp(user);
    res.status(result.status).json(result);
  }
  catch (e) {
    res.status(400).json({success: false, message: e.message, status: 400});
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const user = req.body;
    const result = await Authorization.signInWithEmail(user);
    res.status(result.status).json(result);
  }
  catch (e) {
    res.status(400).json({success: false, data: null, message: e.message, status: 400});
  }
});

router.get('/access-token', Authorization.getAccessToken, async (req, res) => {
  try {
    const result = req.accessToken;
    res.status(200).json(result);
  }
  catch (e) {
    res.status(400).json({success: false, data: null, message: e.message, status: 400});
  }
})


router.get('/authenticate', Authorization.authorization, async (req, res) => {
  try {
    const user = req.user;
    const result = await UserService.getUserById(user.id);
    res.status(result.status).json(result);
  }
  catch (e) {
    res.status(400).json({success: false, data: null, message: e.message, status: 400});
  }
})

router.delete('/logout', async (req, res) => {
  try {
    const token = req.body.refreshToken;
    const result = Authorization.logout(token);
    res.status(result.status).json(result);

  }
  catch (e) {
    res.status(400).json({success: false, message: e.message, status: 400});
  }
})


module.exports = router