const express = require("express");

const morgan = require("morgan");

const fraudDetectionRouter = require("./routes/fraud_detection/fraud_detection.router");
const authRouter = require("./routes/authentication/authentication.router");
const userReportsRouter = require("./routes/user_reports/user_reports.router");

const app = express();

//! Middlewares
app.use(morgan("dev"));

app.use(express.json());

app.use("/fraud", fraudDetectionRouter);
app.use("/auth", authRouter);
app.use("/report", userReportsRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Grahak Surakhsha API",
    });
});

module.exports = app;
