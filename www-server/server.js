require('dotenv').config();

const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Initiate mongo config & import logging tool
const { mongo, logger } = require(path.join(__dirname, "config"));

// Cors config - allow all
app.use(cors());
app.options("*", cors()); // enable pre-flight for DELETE request

/*
    Middlewares that allow Express to accept
    form and JSON data in requests
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const router = require(path.join(__dirname, "routes"));
app.use("/", router);

// Handle unsupported routes
app.use((req, res, next) => {
  const error = new Error("This is not the route you are looking for");
  error.status = 404;
  next(error);
});

// Handle errors thrown in routes
app.use((error, req, res, next) => {
  logger.error(error);

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Catch previously uncaught expections
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception: ', error);
});


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => logger.info(`Express server listening on ${PORT}`));
