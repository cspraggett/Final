const express = require('express');
const router = express.Router();
const pool = require('../db/index')

pool.connect()

router.get('/hello', (req, res) => {
  console.log('in get');
  pool.query(`
    select * from employees;
  `)
    .then(result => {
      console.log(result.rows)
      res.json(result.rows)
    });

  // pool.close();
})

router.get('/', (req, res) => {
  console.log('in / ');
  res.send('Holla');
})

module.exports = router;