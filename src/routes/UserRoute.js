const express = require('express');
const router = express.Router();
const UserService = require("../services/UserService");

router.post('/sign-up', async (req, res) => {
  try {
    const user = req.body;
    const result = await UserService.signUp(user);
    res.status(201).json({message: result});
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const user = req.body;
    const result = await UserService.signInWithEmail(user);
    res.status(200).json({accessToken: result});
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

module.exports = router