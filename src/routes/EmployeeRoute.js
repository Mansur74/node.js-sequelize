const express = require('express');
const router = express.Router();
const EmployeeService = require('../services/EmployeeService');

router.post('/', async (req, res) => {
  try {
    const emmployee = await EmployeeService.create(req.body);
    res.status(201).json(emmployee);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

router.get('/', async (req, res) => {
  try{
    const emmployees = await EmployeeService.findAll();
    res.status(200).json(emmployees);
  }
  catch(e){
    res.status(400).json({message: e.message});
  }
})

router.get('/:id', async (req, res) => {
  try{
    const {id : studentId} = req.params;
    const emmployee = await EmployeeService.findById(studentId);
    res.status(200).json(emmployee);
  }
  catch(e){
    res.status(400).json({message: e.message});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id : studentId} = req.params;
    const deletedCount = await EmployeeService.delete(studentId);
    res.status(200).json({deletedCount: deletedCount});
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

module.exports = router;