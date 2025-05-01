import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
	try {
		const { userId, imageUrl } = await request.json();

		if (!userId || !imageUrl) {
			return NextResponse.json(
				{ message: "User ID and Image URL are required" },
				{ status: 400 }
			);
		}

		// Verify user exists
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return NextResponse.json(
				{ message: "User does not exist" },
				{ status: 404 }
			);
		}

		// Save image to database
		const newImage = await prisma.image.create({
			data: {
				imageUrl,
				userId,
			},
		});

		return NextResponse.json(
			{ message: "Image uploaded successfully", image: newImage },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Upload Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
