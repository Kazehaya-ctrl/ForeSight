export default async function Airesponse() {
	const response = await fetch("http://localhost:4000/gemini");
	const data = await response.json();
	return data;
}
