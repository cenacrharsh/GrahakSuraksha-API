const express = require("express");

const fraudDetectionRouter = express.Router();

const { fraudDetectionHandler } = require("./fraud_detection.controller");

fraudDetectionRouter.post("/fraud", fraudDetectionHandler);

module.exports = fraudDetectionRouter;
