import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs"; // for password hashing

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return NextResponse.json(
				{ message: "Username and password are required" },
				{ status: 400 }
			);
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { username },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 409 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const user = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
			{ message: "User created successfully", user },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Signup Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
