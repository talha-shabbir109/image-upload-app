"use client";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Toast from "../../components/Toast"; // Import Toast

const LoginPage = () => {
	const { login } = useContext(AuthContext);
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showToast, setShowToast] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || "Login failed");
				return;
			}

			// Save full user (id and username) in context
			login({ id: data.user.id, username: data.user.username });
			setShowToast(true);

			setTimeout(() => {
				router.push("/dashboard");
			}, 2000);
		} catch (error) {
			console.error("Login Error:", error);
			setError("Something went wrong");
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow relative">
			<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
					className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
				>
					Login
				</button>
			</form>
			{showToast && <Toast message="Login Successful! Redirecting..." />}
		</div>
	);
};

export default LoginPage;
