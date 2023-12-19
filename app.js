// app.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./src/routes");

const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
