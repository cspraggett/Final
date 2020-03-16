const { Client } = require("pg");
// const pool = new Pool()
const client = new Client();
//   user: "final",
//   password: "final",
//   host: "localhost",
//   database: "finaltest"
// });

client.connect();

module.exports = client;
