const express = require('express');
const router = express.Router();
const Authorization = require("../services/Authorization");
const UserService = require("../services/UserService");

router.post('/sign-up', Authorization.signUp, async (req, res) => {
  try {
    res.status(201).json({ success: true, message: "User Created Succesfully" });
  }
  catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

router.post('/sign-in', Authorization.signInWithEmail, async (req, res) => {
  try {
    res.status(200).json({ success: true, data: req.result, message: null });
  }
  catch (e) {
    res.status(400).json({ success: false, data: null, message: e.message });
  }
});

router.get('/access-token', Authorization.getAccessToken, async (req, res) => {
  try {
    const accessToken = req.accessToken;
    res.status(200).json({ success: true, data: accessToken, message: null });
  }
  catch (e) {
    res.status(400).json({ success: false, data: null, message: e.message });
  }
})


router.get('/authorize', Authorization.authorization, async (req, res) => {
  try {
    const user = req.user;
    const result = await UserService.getUserById(user.id);
    res.status(200).json({ success: true, data: result, message: null});
  }
  catch (e) {
    res.status(400).json({ success: false, data: null, message: e.message });
  }
})

router.delete('/logout', Authorization.logout, async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });

  }
  catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
})


module.exports = router