import express, { Router } from "express";
import { DayRoutes } from "./app/routes/DayRoutes"
import * as dotenv from "dotenv";
import {connect} from "mongoose";
import { updateFromEndpoint } from "./app/modules/updateData";
import bodyParser from "body-parser";
import cors from "cors";
class Server {
    constructor() {
        dotenv.config();
        this.app = express();
        this.router = Router();
        
        this.config();
        this.connection = connect(process.env.CONNECTION_STRING,
            { useUnifiedTopology: true, useNewUrlParser: true },
            () => console.log("Connected to MongoDB."));
        this.dayRoutes = new DayRoutes();
        this.app.use(cors());
        this.dayRoutes.routes(this.router); 
        updateFromEndpoint()
        this.app.use("/api/v1", this.router);
        this.app.listen(8070 || process.env.PORT, () => console.log(`Listening on port ${8070}`));
        setInterval(updateFromEndpoint, 5 * 60 * 1000);
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}


export default new Server().app;