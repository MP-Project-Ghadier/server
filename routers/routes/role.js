const express = require("express");
const roleRouter = express.Router();

const { newRole, roles } = require("../controllers/role");

roleRouter.post("/newRole", newRole);
roleRouter.get("/roles", roles);

module.exports = roleRouter;
