require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const route = require("./routes/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);
app.use("/employees", route);
app.use("/shifts", route);
app.use("/admins", route);
app.use("/employeeshits", route);
app.use("/days", route);
app.use("/availability", route);
app.use("/schedules", route);
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/api/world', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
