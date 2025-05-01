"use client";

import { useEffect, useState } from "react";

interface ToastProps {
	message: string;
	duration?: number;
}

const Toast = ({ message, duration = 3000 }: ToastProps) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	if (!visible) return null;

	return (
		<div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
			{message}
		</div>
	);
};

export default Toast;
