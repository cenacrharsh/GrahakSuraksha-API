const express = require("express");

const morgan = require("morgan");

const fraudDetectionRouter = require("./routes/fraud_detection/fraud_detection.router");

const app = express();

//! Middlewares
app.use(morgan("dev"));

app.use(express.json());

app.use(fraudDetectionRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

module.exports = app;
