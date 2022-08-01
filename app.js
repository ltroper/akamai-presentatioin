const express = require('express');
const bodyParser = require("body-parser")

const routes = require('./routes');

const app = express();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

//app.use accepts a function and is global level middleware

//Parse incoming request bodies in a middleware before handlers, available under the req.body property.

//Returns middleware that only parses urlencoded bodies and
//only looks at requests where the Content-Type header matches the type option
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);


//Returns middleware that only parses json and only
//looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.json());

app.use(routes);

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
