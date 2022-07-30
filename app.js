const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')
const bodyParser = require("body-parser")

const routes = require('./routes');

const app = express();

app.use(routes);

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);



app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
  }

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});


app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
    });
});


module.exports = app;
