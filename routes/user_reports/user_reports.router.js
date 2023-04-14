const express = require("express");

const userReportsRouter = express.Router();

const { userReportsHandler } = require("./user_reports.controller");

userReportsRouter.post("/", userReportsHandler);

module.exports = userReportsRouter;
