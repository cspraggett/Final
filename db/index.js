const { Pool } = require("pg")

const pool = new Pool({
  user: '',
  password: '',
  host: 'localhost',
  database: ''
});

module.exports = pool;
