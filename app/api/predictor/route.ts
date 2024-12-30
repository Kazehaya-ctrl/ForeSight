import { NextRequest, NextResponse } from "next/server";

interface bodySchema {
	name: string;
}

export async function handler(req: NextRequest, res: NextResponse) {
	if (req.method === "GET") {
		return NextResponse.json({
			msg: "Success",
		});
	}

	if (req.method === "POST") {
		const body: bodySchema = await req.json();
		if (body) {
			return NextResponse.json({
				msg: "Sucess",
				name: body.name,
			});
		}
	}
}

export { handler as GET, handler as POST };
