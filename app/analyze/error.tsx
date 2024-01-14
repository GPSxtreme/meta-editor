"use client";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ErrorPage({
	error,
}: {
	error: Error & { digest?: string };
}) {
	return (
		<div className="flex flex-col items-center justify-center h-[80vh] px-4">
			<ExclamationTriangleIcon className="w-14 h-14 text-violet-500 mb-4" />
			<h1 className="text-4xl text-violet-500 mb-2">Error</h1>
			<p className="mb-4 text-lg text-center">{error.message}</p>
		</div>
	);
}
