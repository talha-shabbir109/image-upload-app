import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return NextResponse.json(
				{ message: "Username and password are required" },
				{ status: 400 }
			);
		}

		// Find user in database
		const user = await prisma.user.findUnique({
			where: { username },
		});

		if (!user) {
			return NextResponse.json(
				{ message: "User does not exist" },
				{ status: 404 }
			);
		}

		// Compare password with hashed password
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return NextResponse.json(
				{ message: "Invalid password" },
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{
				message: "Login successful",
				user: { id: user.id, username: user.username },
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Login Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
