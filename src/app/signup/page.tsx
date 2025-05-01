"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../components/Toast"; // Import Toast

const SignupPage = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showToast, setShowToast] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || "Signup failed");
				return;
			}

			setShowToast(true);
			setTimeout(() => {
				router.push("/login");
			}, 2000); // Wait for 2 seconds then redirect to login
		} catch (error) {
			console.error("Signup Error:", error);
			setError("Something went wrong");
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow relative">
			<h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{error && <p className="text-red-500">{error}</p>}
				<div>
					<label className="block mb-1">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full p-2 border rounded dark:bg-gray-700"
						required
					/>
				</div>
				<div>
					<label className="block mb-1">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border rounded dark:bg-gray-700"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
				>
					Sign Up
				</button>
			</form>
			{showToast && <Toast message="Signup Successful! Redirecting..." />}
		</div>
	);
};

export default SignupPage;
