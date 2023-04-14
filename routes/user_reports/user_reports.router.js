const express = require("express");

const userReportsRouter = express.Router();

const {
    userReportsHandler,
    getAllReportsHandler,
} = require("./user_reports.controller");

userReportsRouter.post("/", userReportsHandler);
userReportsRouter.get("/", getAllReportsHandler);

module.exports = userReportsRouter;
