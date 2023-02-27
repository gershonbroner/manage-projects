const cors = require("cors");
const express = require("express");
const app = express();
require("./conectMango/formConectMango");
const { routesInit } = require("./routs/confing_rout");
app.use(express.json());
app.use(cors());
routesInit(app);
app.listen(5000);
