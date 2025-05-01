"use client"; // Using client side for interactivity

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
	const { images } = useContext(AuthContext);

	return (
		<div>
			<h1 className="text-4xl font-bold text-center my-10">
				Welcome to Image Upload App
			</h1>

			{images.length > 0 ? (
				<>
					<h2 className="text-2xl font-bold text-center mb-6">
						Uploaded Images
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{images.map((imgUrl, idx) => (
							<div
								key={idx}
								className="bg-white dark:bg-gray-800 p-4 rounded shadow"
							>
								<img
									src={imgUrl}
									alt={`Uploaded ${idx}`}
									className="w-full h-48 object-cover rounded"
								/>
							</div>
						))}
					</div>
				</>
			) : (
				<p className="text-center text-gray-500 mt-10">
					No images uploaded yet. Login and start uploading!
				</p>
			)}
		</div>
	);
};

export default HomePage;
