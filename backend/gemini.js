import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const api = process.env.API_KEY || "";

const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const image = {
	inlineData: {
		data: Buffer.from(fs.readFileSync("energyConsumption.png")).toString(
			"base64"
		),
		mimeType: "image/png",
	},
};

const prompt = `From the image can you generate and predict the energy consumption of every month in the year in a json format and state you prediction value for the all 12 month what you are prediction the consumption must be	{ date: "2023-01", actual: 1000, predicted: 950 }, avoid any comments`;

const result = await model.generateContent([image, prompt]);
console.log(result.response.text());
