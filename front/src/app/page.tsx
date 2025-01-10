"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
	const [message, setMessage] = useState("");
	const [input, setInput] = useState("");

	useEffect(() => {
		fetch("http://localhost:3005")
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	const handleSubmit = () => {
		fetch("http://localhost:3005", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ input }),
		})
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error("Error sending data:", error));
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1 className="text-4xl font-bold text-center sm:text-left hover:cursor-pointer hover:bg-gradient-to-r from-red-700 via-blue-300 to-slate-600 inline-block hover:text-transparent bg-clip-text">
					Web App
				</h1>
				{/* Input field and button */}
				<div className="flex flex-row gap-5 items-center sm:items-start">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="border rounded px-5 py-1 focus:border-red-600 p-7"
						placeholder="Enter text"
					/>
					<button
						className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
						onClick={() => {
							if (input.trim() !== "") {
								handleSubmit();
							} else {
								alert("Input cannot be empty");
							}
						}}>
						<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
							Send
						</span>
					</button>
				</div>
				{/* Display the fetched message */}
				<div className="text-center sm:text-left">
					<p>{message}</p>
				</div>
			</main>
		</div>
	);
}
