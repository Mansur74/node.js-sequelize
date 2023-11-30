const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


router.post('/', async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student)
})

router.delete('/:id', async (req, res) => {
  const {id : studentId} = req.params;
  const count = await Student.destroy({where: {id: studentId}});
  res.status(200).json({deletedCount: count})
})

router.get('/', async (req, res) => {
  try{
    const students = await Student.findAll();
    res.status(200).json(students)
  }
  catch(e){
    res.send(e.message)
  }
})

router.get('/:id', async (req, res) => {
  try{
    const {id : studentId} = req.params;
    const student = await Student.findOne({where: {id: studentId}});
    res.status(200).json(student)
  }
  catch(e){
    res.send(e.message)
  }
})

module.exports = router;