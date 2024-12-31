import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import express from "express";

dotenv.config();
const app = express();

const api = process.env.API_KEY || "";
const port = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.listen(port, () => {
	console.log(new Date() + `Server running on port ${port}`);
});

const image = {
	inlineData: {
		data: Buffer.from(fs.readFileSync("energyConsumption.png")).toString(
			"base64"
		),
		mimeType: "image/png",
	},
};

const prompt = `From the image can you generate and predict the energy consumption of every month in the year in a json format and state you prediction value for the all 12 month what you are prediction the consumption must be	{ date: "2023-01", actual: 1000, predicted: 950 }, avoid any comments`;

app.get("/gemini", async (req, res) => {
	try {
		const result = await model.generateContent([image, prompt]);
		if (result) {
			console.log(result.response.text());
			const array = JSON.parse(
				result.response
					.text()
					.replace(/```json|\```/g, "")
					.trim()
			);
			console.log(array);
			if (array) {
				res.json({
					msg: "Sucess",
					array,
				});
			} else {
				res.status(411).json({
					msg: "Matched not found",
				});
			}
		} else {
			res.status(411).json({
				msg: "Failed result not found",
			});
		}
	} catch (E) {
		console.log("Error" + E);
		res.status(411).json({
			msg: "Failed",
		});
	}
});
