"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
	const { user, logout } = useContext(AuthContext);
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	return (
		<header className="bg-gray-900 text-white dark:bg-gray-800 shadow-md">
			<div className="container mx-auto flex justify-between items-center py-4 px-6">
				{/* Logo with Image and Text */}
				<Link href="/" className="flex items-center space-x-2">
					<img
						src="/logo.png"
						alt="Logo"
						className="h-13 w-13 object-contain"
					/>
					<span className="text-2xl font-bold">Image Upload App</span>
				</Link>

				{/* Navigation Links */}
				<nav className="flex items-center space-x-4">
					{!user ? (
						<>
							<Link href="/login" className="hover:underline">
								Login
							</Link>
							<Link href="/signup" className="hover:underline">
								Signup
							</Link>
						</>
					) : (
						<>
							<Link href="/dashboard" className="hover:underline">
								Dashboard
							</Link>
							<button
								onClick={handleLogout}
								className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
							>
								Logout
							</button>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
