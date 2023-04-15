const express = require("express");

const userReportsRouter = express.Router();

const {
    userReportsHandler,
    getAllReportsHandler,
    acceptReportHandler,
} = require("./user_reports.controller");

userReportsRouter.post("/", userReportsHandler);
userReportsRouter.get("/", getAllReportsHandler);
userReportsRouter.get("/accept_report/:id", acceptReportHandler);

module.exports = userReportsRouter;
