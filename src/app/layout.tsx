import "./globals.css"; // Import Tailwind
import { AuthProvider } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Image Upload App",
	description: "Simple image upload app using Next.js and TailwindCSS",
	icons: {
		icon: "/logo.png", // ✅ Public folder ke andar logo hoga
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col">
				<AuthProvider>
					<Header />
					<main className="flex-grow container mx-auto px-4 py-8">
						{children}
					</main>
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
