import { model } from "mongoose";
import DayModel from "../models/DayModel";    

class DayController {
    constructor() {
        this.DailyInfections = model('dailyinfections', DayModel)
    }

    async getAllData (req, res) {
        let data = await this.DailyInfections.find({"states.name": req.params.stateName}).exec();
        
        return data;
    }
}

export default DayController;