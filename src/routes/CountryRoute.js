const CountryService = require('../services/CountryService');
const Authorization = require("../services/Authorization");
const express = require('express');
const router = express.Router();

router.post('/', Authorization.authorization, async (req, res) => {
  try {
    const country = req.body;
    const createdCountry = await CountryService.create(country);
    res.status(201).json(createdCountry); 
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

router.get('/', Authorization.authorization, async (req, res) => {
  try {
    const countries = await CountryService.findAll();
    res.status(200).json(countries);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

router.get('/:id', Authorization.authorization, async (req, res) => {
  try {
    const {id: countryId} = req.params;
    const country = await CountryService.findById(countryId);
    res.status(201).json(country);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

router.delete('/:id', Authorization.authorization, async (req, res) => {
  try {
    const {id: countryId} = req.params;
    const deletedCount = await CountryService.delete(countryId);
    res.status(200).json({deletedCount: deletedCount});
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
});

module.exports = router;

