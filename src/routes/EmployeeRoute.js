const express = require('express');
const router = express.Router();
const EmployeeService = require('../services/EmployeeService');
const Authorization = require("../services/Authorization");

router.post('/', Authorization.authorization, async (req, res) => {
  try {
    const emmployee = await EmployeeService.create(req.body);
    res.status(201).json(emmployee);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

router.get('/', Authorization.authorization, async (req, res) => {
  try {
    const {page, size} = req.query;
    const emmployees = await EmployeeService.findAndCountAll(parseInt(page), parseInt(size));
    res.status(200).json(emmployees);
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

router.get('/:id', Authorization.authorization, async (req, res) => {
  try{
    const {id : employeeId} = req.params;
    const emmployee = await EmployeeService.findById(employeeId);
    res.status(200).json(emmployee);
  }
  catch(e){
    res.status(400).json({message: e.message});
  }
})

router.delete('/:id', Authorization.authorization, async (req, res) => {
  try {
    const {id : employeeId} = req.params;
    const deletedCount = await EmployeeService.delete(employeeId);
    res.status(200).json({deletedCount: deletedCount});
  } 
  catch (e) {
    res.status(400).json({message: e.message});
  }
})

router.patch('/:id', Authorization.authorization, async (req, res) => {
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