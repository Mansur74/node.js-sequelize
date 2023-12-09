const express = require('express')
const router = express.Router();
const PassportService = require('../services/PassportService')

router.get('/', async (req, res) => {
  try {
    const passports = await PassportService.findAll();
    res.status(200).json(passports);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id: passportId} = req.params;
    const passport = await PassportService.findById(passportId);
    res.status(201).json(passport);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id: passportId} = req.params;
    const deletedCount = await PassportService.delete(passportId);
    res.status(200).json({deletedCount: deletedCount});
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

router.post('/:id', async (req, res) => {
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

module.exports = router;