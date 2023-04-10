const express = require("express");

const fraudDetectionRouter = express.Router();

// const { httpGetAllPlanets } = require("./planets.controller");

fraudDetectionRouter.get("/fraud", fraudDetectionHandler);

module.exports = fraudDetectionRouter;
