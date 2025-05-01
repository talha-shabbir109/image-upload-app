"use client";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white dark:bg-gray-800 py-4">
			<div className="container mx-auto text-center text-sm">
				© {new Date().getFullYear()} Image Upload App. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
