const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
require("./db/index.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SERVER ON ${PORT}`);
});
