const express = require('express')
const router = express.Router();
const PassportService = require('../services/PassportService')

router.get('/', async (req, res) => {
  try {
    const passports = await PassportService.findAll();
    res.status(200).json(passports);
  } 
  catch (error) {
    res.status(200).json(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id: passportId} = req.params;
    const passport = await PassportService.findById(passportId);
    res.status(201).json(passport);
  } 
  catch (e) {
    res.status(200).json(e.message);
  }
})

router.post('/:id', async (req, res) => {
  try {
    const passport = req.body;
    const {id: employeeId} = req.params;
    const createdPassport = await PassportService.create(passport, employeeId);
    res.status(201).json(createdPassport);
  } 
  catch (e) {
    res.status(200).json(e.message);
  }
});

module.exports = router;