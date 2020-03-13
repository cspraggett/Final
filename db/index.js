const { Pool } = require("pg")

// const pool = new Pool()
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'finaltest',
});

module.exports = pool;