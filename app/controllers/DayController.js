import { model } from "mongoose";
import DayModel from "../models/DayModel";    
const DailyInfections = model('dailyinfections', DayModel)
export class DayController {
    async getAllData (req, res) {
        let data = await DailyInfections.find({}).exec();
        
        res.json(data);
    }
}

export default DayController;