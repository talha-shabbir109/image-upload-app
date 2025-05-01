"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
	id: number;
	username: string;
}

interface AuthContextType {
	user: User | null;
	login: (userData: User) => void;
	logout: () => void;
	images: string[];
	uploadImage: (imageUrl: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	login: () => {},
	logout: () => {},
	images: [],
	uploadImage: () => {},
});

interface Props {
	children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [images, setImages] = useState<string[]>([]);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (userData: User) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
		router.push("/dashboard");
	};

	const logout = () => {
		localStorage.removeItem("user");
		setUser(null);
		router.push("/login");
	};

	const uploadImage = (imageUrl: string) => {
		setImages((prev) => [...prev, imageUrl]);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, images, uploadImage }}>
			{children}
		</AuthContext.Provider>
	);
};
