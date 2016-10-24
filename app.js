var express = require('express');
var bodyParser = require("body-parser");
var port = (process.env.VCAP_APP_PORT);
var app = express();

app.use(bodyParser.json());
var routes = require("./api.js")(app);
app.listen(port);