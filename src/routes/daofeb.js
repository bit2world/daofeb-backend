/* eslint-disable consistent-return */
const express = require('express');
// const schema = require('../db/schema');
// const db = require('../db/connection');

// const employees = db.get('employees');
const Parent = require("../mock/Parent.json");
const Child = require("../mock/Child.json");

const router = express.Router();

/* Get all employees */
router.get('/testtable', async (req, res, next) => {
  try {
    // const allEmployees = await employees.find({});
    // res.json(allEmployees);
    console.log('request', req.query);
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    var data = Parent.data.slice(page * size, (page + 1) * size);
    data.map(record => {
      const sum = Child.data.filter(item => item.parentId == record.id)
        .reduce((accumulator, current) => accumulator + current.paidAmount, 0);
      record.totalPaidAmount = sum;
    })
    res.json({ 'tutorials': data, totalPages: Math.ceil(Parent.data.length / size) });

  } catch (error) {
    next(error);
  }
});

/* Get a specific employee */
router.get('/testtable/:id', async (req, res, next) => {
  try {
    const parentId = parseInt(req.params.id);
    const parentRecord = Parent.data.filter(item=> item.id == parentId)[0];
    var data = Child.data.filter(item=>item.parentId == parentId)
    console.log('request', parentId, parentRecord);
    data.map(child=>{
          child['sender'] = parentRecord.sender;
          child['receiver'] = parentRecord.receiver;
          child['totalAmount'] = parentRecord.totalAmount;
        }) || [];
    res.json({ 'tutorials': data, totalPages: '1' });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
