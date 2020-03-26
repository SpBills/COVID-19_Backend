// Followed from https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

import express, { Router } from "express";
import { DayRoutes } from "./app/routes/DayRoutes"
require("dotenv").config();
const mongoose = require('mongoose');
const onStartModules = require('./app/modules/updateData');
import bodyParser from "body-parser";
var CronJob = require("cron").CronJob; 
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.router = Router();
        
        this.config();
        this.connection = mongoose.connect(process.env.CONNECTION_STRING,
            { useUnifiedTopology: true, useNewUrlParser: true },
            () => console.log("Connected to MongoDB."));
        this.dayRoutes = new DayRoutes();
        this.app.use(cors());
        this.dayRoutes.routes(this.router); 
        var job = new CronJob("* */5 * * * *", onStartModules.updateFromEndpoint(), console.log("Updated from endpoint."));
        job.start();
        this.app.use("/api/v1", this.router);
        this.app.listen(8070 || process.env.PORT, () => console.log(`Listening on port ${8070}`));
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}


export default new Server().app;