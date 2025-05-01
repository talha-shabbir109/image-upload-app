"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Toast from "../../components/Toast";

const DashboardPage = () => {
	const { user, logout, images, uploadImage } = useContext(AuthContext);
	const [userImages, setUserImages] = useState<string[]>([]);
	const [showToast, setShowToast] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/login");
		} else {
			setUserImages(images);
		}
	}, [user, images, router]);

	const handleUpload = async (file: File) => {
		if (!user) {
			console.error("User not found!");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = async () => {
			if (reader.result) {
				try {
					const response = await fetch("/api/upload", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							userId: user.id,
							imageUrl: reader.result,
						}),
					});

					if (response.ok) {
						uploadImage(reader.result as string);
						setShowToast(true);
						setTimeout(() => {
							setShowToast(false);
						}, 3000);
					}
				} catch (error) {
					console.error("Upload Error:", error);
				}
			}
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-start py-10">
			{showToast && <Toast message="Image Uploaded Successfully!" />}

			{/* Welcome Message */}
			{user && (
				<h2 className="text-3xl font-bold mb-8 text-center animate-fade-in">
					Welcome, <span className="text-blue-500">{user.username}</span>! 🚀
				</h2>
			)}

			{/* Upload Button Section */}
			<div className="flex flex-col items-center space-y-6 mb-12">
				{/* Hidden File Input */}
				<input
					id="fileInput"
					type="file"
					accept="image/*"
					className="hidden"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) {
							handleUpload(file);
						}
					}}
				/>

				{/* Upload Button */}
				<label
					htmlFor="fileInput"
					className="cursor-pointer flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 mr-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3m-9-6V5a2 2 0 012-2h6a2 2 0 012 2v3"
						/>
					</svg>
					Upload Image
				</label>

				<p className="text-gray-500 dark:text-gray-400 text-sm">
					Choose an image to upload
				</p>
			</div>

			{/* Uploaded Images Gallery */}
			<div className="w-full max-w-6xl px-4">
				<h3 className="text-2xl font-bold mb-6 text-center">
					Your Uploaded Images
				</h3>

				{userImages.length === 0 ? (
					<p className="text-center text-gray-500">No images uploaded yet.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{userImages.map((imgUrl, idx) => (
							<div
								key={idx}
								className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
							>
								<img
									src={imgUrl}
									alt={`Uploaded ${idx}`}
									className="w-full h-64 object-cover"
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardPage;
