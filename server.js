// Followed from https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

const Express = require('express');
require("dotenv").config();

let port = 6050;
const app = Express();
const routes = require('./app/routes/DayRoutes');
const onStartModules = require('./app/modules/updateData');
var mongoose = require('mongoose');

const uri = process.env.CONNECTION_STRING;
mongoose.connect(uri);

onStartModules.updateFromEndpoint();

app.listen(port || process.env.PORT, () => console.log(`Listening on port ${port}`));