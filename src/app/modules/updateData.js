import DayModel from "../models/DayModel";
import { model } from "mongoose";
import fetch from "node-fetch";

exports.updateFromEndpoint = async () => {
	var dayModel = model("alldailyinfections", DayModel);

	let databaseData = await dayModel
		.findOne()
		.sort({ _id: -1 })
		.exec();
	let endpointData = await fetch(
		"https://wuflu.banic.stream/john_hopkins_csse_data.json"
	);
	let endpointJson = await endpointData.json();
	let dataAreas = endpointJson.timestamped_data[0].areas;
	let time = endpointJson.timestamped_data[0].date;
	const requests = dataAreas.map(async area => {
		if (area.stats) {
			return {
				name: area.name,
				stats: {
					confirmed: area.stats.confirmed,
					deaths: area.stats.deaths,
					recoveries: area.stats.recoveries
				}
			};
		} else {
			var finalConfirmed = 0;
			var finalDeaths = 0;
			var finalRecoveries = 0;
			area.areas.forEach(area => {
				finalConfirmed += area.stats.confirmed;
				finalDeaths += area.stats.deaths ? area.stats.deaths : 0;
				finalRecoveries += area.stats.recoveries ? area.stats.recoveries : 0;
			});

			return {
				name: area.name,
				stats: {
					confirmed: finalConfirmed,
					deaths: finalDeaths,
					recoveries: finalRecoveries
				}
			};
		}
	})
	const results = await Promise.all(requests);
	let newDayObject = {
		date: time,
		areas: results
	}
	let newDay = new dayModel(newDayObject);
	
	if (databaseData && sameDay(new Date(databaseData.date), new Date(time))) {
		let data = dayModel.updateOne({date: databaseData.date}, newDayObject, {upsert: true});
		data.exec();
		console.log(`Updated at timestamp: ${time}`)
	} else {
		newDay.save();
		console.log(`SAVED at timestamp: ${time}`)
	}
};

function sameDay(d1, d2) {
	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	);
}
