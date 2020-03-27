import { Schema } from "mongoose";

let DayModel = new Schema({
    date: Date,
    areas: [
        {
            name: String,
            stats: {
                confirmed: Number,
                deaths: Number,
                recoveries: Number
            }
        }
    ]
});

export default DayModel;