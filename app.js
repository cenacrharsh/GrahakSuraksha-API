const express = require("express");
const path = require("path");

const cors = require("cors");
const morgan = require("morgan");

// const planetsRouter = require("./routes/planets/planets.router");

const app = express();

//! Middlewares
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use(morgan("dev"));

app.use(express.json());
// app.use(express.static(path.join(__dirname, "..", "public")));

// app.use(launchesRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

module.exports = app;
