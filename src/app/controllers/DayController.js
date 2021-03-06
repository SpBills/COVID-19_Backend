import { model } from "mongoose";
import DayModel from "../models/DayModel";    
import { populateDatabaseCompletely, deleteDatabase } from "../modules/updateData"
const DailyInfections = model('alldailyinfections', DayModel);
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

    async getDataByArea (req, res) {
        let days = await DailyInfections.find().exec();
        const final = [];
        days.map(day => {
            final.push({
                date: day.date,
                data: day.areas.filter(area => area.name === req.params.area)[0]
            })
        })
        res.json(final);
    }
}



export default DayController;