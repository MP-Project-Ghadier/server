const express = require("express");
const statusRouter = express.Router();

const { newStatus, allStatus } = require("../controllers/status");

statusRouter.post("/newStatus", newStatus);
statusRouter.get("/allStatus", allStatus);

module.exports = statusRouter;
