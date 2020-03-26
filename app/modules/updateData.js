import DayModel from "../models/DayModel";
import { model } from "mongoose";
import fetch from "node-fetch";

exports.updateFromEndpoint = async () => {
    var dayModel = model("dailyinfections", DayModel);

    let databaseData = await dayModel.find().sort({ _id: -1 }).limit(1).exec();
    let endpointData = await fetch("https://wuflu.banic.stream/john_hopkins_csse_data.json");
    let endpointJson = await endpointData.json();
    let areas = endpointJson.timestamped_data[0].areas;
    let time = endpointJson.timestamped_data[0].date;
    let us = areas.filter(areas => areas.name === "US");
    let newDay = new dayModel({
        date: Date.parse(time),
        confirmed: us[0].stats.confirmed,
        deaths: us[0].stats.deaths,
        recoveries: us[0].stats.recoveries
    });


    if (databaseData.length && sameDay(new Date(databaseData[0].date), new Date(time))) {
        databaseData[0].update({}, newDay);
        console.log("update");
    } else {
        newDay.save();
        console.log("separate day. new day inserted.");
    }

}

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}