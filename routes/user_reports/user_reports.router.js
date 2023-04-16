const express = require("express");

const userReportsRouter = express.Router();

const {
    userReportsHandler,
    getAllReportsHandler,
    acceptReportHandler,
    verifyReportedEntityHandler,
} = require("./user_reports.controller");

userReportsRouter.post("/", userReportsHandler);
userReportsRouter.get("/", getAllReportsHandler);
userReportsRouter.post("/accept_report", acceptReportHandler);
userReportsRouter.post("/verify_reported_entity", verifyReportedEntityHandler);

module.exports = userReportsRouter;
