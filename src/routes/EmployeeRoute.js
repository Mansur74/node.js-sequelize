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
    const {id : employeeId} = req.params;
    const emmployee = await EmployeeService.findById(employeeId);
    res.status(200).json(emmployee);
  }
  catch(e){
    res.status(400).json({message: e.message});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id : employeeId} = req.params;
    const deletedCount = await EmployeeService.delete(employeeId);
    res.status(200).json({deletedCount: deletedCount});
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const {id : employeeId} = req.params;
    const updatedEmployee = await EmployeeService.update(employeeId, req.body);
    res.status(200).json(updatedEmployee);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

module.exports = router;