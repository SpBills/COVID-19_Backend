import { model } from "mongoose";
import DayModel from "../models/DayModel";    
import { populateDatabaseCompletely, deleteDatabase } from "../modules/updateData"
const DailyInfections = model('dailyinfections', DayModel)
export class DayController {
    async getAllData (req, res) {
        let data = await DailyInfections.find({}).exec();
        
        res.json(data);
    }

    async populateFullDatabase (req, res) {
        populateDatabaseCompletely();

        res.json({message: "Completed."});
    }

    async deleteDatabase (req, res) {
        deleteDatabase();
        res.json({message: "Completed."})
    }
}



export default DayController;