const express = require('express');
const router = express.Router();
const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");

router.post('/sign-up', async (req, res) => {
  try {
    const user = req.body;
    const result = await UserService.signUp(user);
    res.status(201).json({ message: result });
  }
  catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const user = req.body;
    const result = await UserService.signInWithEmail(user);
    res.status(200).json(result);
  }
  catch (e) {
    res.status(400).json({ message: e.message });

  }
});

router.post('/access-token', UserService.getAccessToken, async (req, res) => {
  try {
    const result = req.accessToken;
    res.status(200).json(result);
  }
  catch (e) {
    res.status(400).json({ message: e.message });
  }
})


router.post('/authenticate', UserService.verifyAccessToken, async (req, res) => {
  try {
    const user = req.user;
    const result = await UserService.getUserById(user.id);
    res.status(200).json(result);
  }
  catch (e) {
    res.status(400).json({ message: e.message });
  }
})

router.delete('/logout', async (req, res) => {
  try {
    const token = req.body.refreshToken;
    const result = UserService.logout(token);
    res.status(200).json({message: result});

  }
  catch (e) {
    res.status(400).json({ message: e.message });
  }
})


module.exports = router