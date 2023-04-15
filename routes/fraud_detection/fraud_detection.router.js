const express = require("express");

const fraudDetectionRouter = express.Router();

const {
    fraudDetectionHandler,
    getAllReportedEntityHandler,
} = require("./fraud_detection.controller");

fraudDetectionRouter.post("/", fraudDetectionHandler);
fraudDetectionRouter.get("/", getAllReportedEntityHandler);

module.exports = fraudDetectionRouter;
