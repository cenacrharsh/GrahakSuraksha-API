const express = require("express");

const fraudDetectionRouter = express.Router();

const { fraudDetectionHandler } = require("./fraud_detection.controller");

fraudDetectionRouter.post("/", fraudDetectionHandler);

module.exports = fraudDetectionRouter;
