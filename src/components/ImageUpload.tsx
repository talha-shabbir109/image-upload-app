"use client";

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ImageUpload = () => {
	const { user, uploadImage } = useContext(AuthContext);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUpload = async () => {
		if (!user || !previewUrl) {
			console.error("User not logged in or no file selected");
			return;
		}

		setUploading(true);

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: user.id, imageUrl: previewUrl }),
			});

			const data = await response.json();

			if (response.ok) {
				uploadImage(previewUrl);
				setSelectedFile(null);
				setPreviewUrl(null);
			} else {
				console.error("Upload failed:", data.message);
			}
		} catch (error) {
			console.error("Upload Error:", error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 p-8 rounded shadow max-w-md mx-auto mb-8">
			<h2 className="text-xl mb-4 text-center">Upload an Image</h2>

			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="mb-4"
			/>

			{previewUrl && (
				<div className="mb-4">
					<img
						src={previewUrl}
						alt="Preview"
						className="w-full h-60 object-cover rounded"
					/>
				</div>
			)}

			<button
				onClick={handleUpload}
				disabled={uploading || !previewUrl}
				className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
			>
				{uploading ? "Uploading..." : "Upload"}
			</button>
		</div>
	);
};

export default ImageUpload;
