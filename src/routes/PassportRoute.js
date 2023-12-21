const express = require('express')
const router = express.Router();
const PassportService = require('../services/PassportService')
const Authorization = require("../services/Authorization");

router.get('/', Authorization.authorization, async (req, res) => {
  try {
    const passports = await PassportService.findAll();
    res.status(200).json(passports);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

router.get('/:id', Authorization.authorization, async (req, res) => {
  try {
    const {id: passportId} = req.params;
    const passport = await PassportService.findById(passportId);
    res.status(200).json(passport);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

router.delete('/:id', Authorization.authorization, async (req, res) => {
  try {
    const {id: passportId} = req.params;
    const deletedCount = await PassportService.delete(passportId);
    res.status(200).json({deletedCount: deletedCount});
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

router.post('/:id', Authorization.authorization, async (req, res) => {
  try {
    const {countries, ...passport} = req.body;
    const {id: employeeId} = req.params;
    const createdPassport = await PassportService.create(passport, countries, employeeId);
    res.status(201).json(createdPassport);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

router.patch('/:id', Authorization.authorization, async (req, res) => {
  try {
    const {countries, ...passport} = req.body;
    const {id: passportId} = req.params;
    const updatedPassport = await PassportService.update(passport, countries, passportId);
    res.status(200).json(updatedPassport);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

module.exports = router;