const { Pool } = require("pg")

// const pool = new Pool()
const pool = new Pool({
  user: 'final',
  password: 'final',
  host: 'localhost',
  database: 'finaltest',
});

module.exports = pool;