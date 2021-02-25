const express = require('express');
const bodyParser = require('body-parser');

const tourRoute = require('./tourRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


 
// Set EJS as templating engine 
app.set("view engine", "ejs");
// routes
app.use("/api/v1",tourRoute);

// start server
module.exports = app;