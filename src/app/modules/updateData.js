import DayModel from "../models/DayModel";
import { model } from "mongoose";
import fetch from "node-fetch";

exports.updateFromEndpoint = async () => {
	var dayModel = model("alldailyinfections", DayModel);

	let databaseData = await dayModel
		.find()
		.sort({ _id: -1 })
		.limit(1)
		.exec();
	let endpointData = await fetch(
		"https://wuflu.banic.stream/john_hopkins_csse_data.json"
	);
	let endpointJson = await endpointData.json();
	let dataAreas = endpointJson.timestamped_data[0].areas;
	let time = endpointJson.timestamped_data[0].date;
	const requests = dataAreas.map(async area => {
		console.log(area);
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
	let newDay;
	const results = await Promise.all(requests);
	newDay = new dayModel({
		date: Date.parse(time),
		areas: results
	})
	
	if (databaseData.length && sameDay(new Date(databaseData[0].date), new Date(time))) {
		dayModel.updateOne({date: Date.parse(time)}, newDay);
		console.log(`Updated at timestamp: ${databaseData[0].date}`)
	} else {
		newDay.save();
		console.log(`SAVED at timestamp: ${databaseData[0].date}`)
	}
};

function sameDay(d1, d2) {
	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	);
}
