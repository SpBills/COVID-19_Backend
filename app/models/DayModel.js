import { Schema } from "mongoose";

let DayModel = new Schema({
    date: Date,
    confirmed: Number,
    deaths: Number,
    recoveries: Number
});

export default DayModel;