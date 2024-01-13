/* eslint-disable @next/next/no-img-element */
import { UrlMetadata } from "@/app/analyze/actions";
import {
	EllipsisHorizontalIcon,
	ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

// Helper function to resolve favicon URL
const getFaviconUrl = (faviconHref: string, baseUrl: string) => {
	try {
		// Check if faviconHref is absolute or relative
		const faviconUrl = new URL(faviconHref, baseUrl);
		return faviconUrl.href;
	} catch (error) {
		// If URL constructor fails, fallback to the original href or an empty string
		return faviconHref || "";
	}
};
export const GoogleCard = ({ metaData }: { metaData: UrlMetadata }) => {
	const title = metaData.title || "Title Not Found";
	const url = metaData.url || "URL Not Found";
	const description = metaData.description || "Description Not Found";
	const favicon =
		metaData.favicons?.length > 0
			? getFaviconUrl(metaData.favicons[0].href, metaData.url)
			: "";

	return (
		<div className="max-w-xl mx-auto p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:border-gray-700 dark:bg-gray-800">
			<div className="flex items-center space-x-2">
				{favicon && (
					<img
						src={favicon}
						alt="Favicon"
						className="w-4 h-4 dark:bg-gray-800"
					/>
				)}{" "}
				{/* Small favicon image */}
				<a
					href={url}
					className="text-sm text-green-700 hover:text-green-900 dark:text-green-400"
				>
					{url}
				</a>
			</div>
			<h2 className="text-lg text-blue-800 font-semibold hover:underline mt-2 dark:text-blue-300">
				{title}
			</h2>
			<p className="text-sm text-gray-800 mt-1 dark:text-gray-300">
				{description}
			</p>
		</div>
	);
};

export const TwitterCard = ({ metaData }: { metaData: UrlMetadata }) => {
	const title =
		metaData["twitter:title"] || metaData.title || "Title Not Found";
	const description =
		metaData["twitter:description"] ||
		metaData.description ||
		"Description Not Found";
	const image: string | null =
		metaData["twitter:image"] || metaData.image || null;
	const imageAlt =
		metaData["twitter:image:alt"] || "Image Description Not Available";
	const url = metaData["og:url"] || metaData.url || "URL Not Found";

	return (
		<div className="max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow dark:border-gray-700">
			{image !== null ? (
				<img src={image} alt={imageAlt} className="w-full h-48 object-cover" />
			) : (
				<ExclamationCircleIcon className="m-12 w-12 h-12 mx-auto text-gray-400" />
			)}
			<div className="p-4 bg-white dark:bg-gray-800">
				<h2 className="text-lg text-gray-900 font-semibold dark:text-gray-100">
					{title}
				</h2>
				<p className="text-sm text-gray-700 mt-1 dark:text-gray-400">
					{description}
				</p>
				<a
					href={url}
					target="blank"
					className="text-sm text-blue-500 hover:underline dark:text-blue-400"
				>
					{url.replace(/^https?:\/\//, "")}
				</a>
			</div>
		</div>
	);
};

export const FacebookCard = ({ metaData }: { metaData: UrlMetadata }) => {
	const title = metaData["og:title"] || metaData.title || "Title Not Found";
	const domain = new URL(
		(metaData["og:url"] || metaData.url || "") as string,
	).hostname.toUpperCase();
	const description =
		metaData["og:description"] ||
		metaData.description ||
		"Description Not Found";
	const image: string | null = metaData["og:image"] || metaData.image || null;
	//alt image

	return (
		<div className="max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-md dark:border-gray-700">
			{image !== null ? (
				<img
					src={image}
					alt="description"
					className="w-full h-48 object-cover"
				/>
			) : (
				<ExclamationCircleIcon className="m-12 w-12 h-12 mx-auto text-gray-400" />
			)}
			<div className="p-4 bg-white dark:bg-gray-800">
				<div className="text-sm text-blue-600 dark:text-blue-400">{domain}</div>
				<h2 className="text-lg text-gray-900 font-semibold dark:text-white mt-2">
					{title}
				</h2>
				<p className="text-sm text-gray-800 dark:text-gray-300 mt-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
					{description}
				</p>
			</div>
		</div>
	);
};

export const LinkedinCard = ({ metaData }: { metaData: UrlMetadata }) => {
	const title = metaData["og:title"] || metaData.title || "Title Not Found";
	const url = metaData["og:url"] || metaData.url || "";
	const domain = url ? new URL(url).hostname : "URL Not Found";
	const image: string | null = metaData["og:image"] || metaData.image || null;

	return (
		<div className="max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg dark:border-gray-700">
			{image !== null ? (
				<img
					src={image}
					alt={title}
					className="w-full object-cover"
					style={{ height: "200px" }}
				/>
			) : (
				<ExclamationCircleIcon className="m-12 w-12 h-12 mx-auto text-gray-400" />
			)}
			<div className="p-4 bg-white dark:bg-gray-800">
				<h2 className="text-lg text-gray-900 font-semibold dark:text-white">
					{title}
				</h2>
				<p className="text-sm text-gray-600 dark:text-gray-300">{domain}</p>
			</div>
		</div>
	);
};

export const PinterestCard = ({ metaData }: { metaData: UrlMetadata }) => {
	const title = metaData["og:title"] || metaData.title || "Title Not Found";
	const image: string | null = metaData["og:image"] || metaData.image || null;

	return (
		<div className="max-w-sm mx-auto overflow-hidden">
			{image !== null ? (
				<img
					src={image}
					alt={title}
					className="w-full object-cover rounded-xl"
					style={{ height: "200px" }}
				/>
			) : (
				<ExclamationCircleIcon className="m-12 w-12 h-12 mx-auto text-gray-400" />
			)}
			<div className="p-2 flex items-center justify-between">
				<h2 className="text-md text-gray-900 font-semibold dark:text-white">
					{title}
				</h2>
				<EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
			</div>
		</div>
	);
};

export const SlackCard = ({ metaData }: { metaData: UrlMetadata }) => {
	const title = metaData["og:title"] || metaData.title || "Title Not Found";
	const url = metaData["og:url"] || metaData.url || "URL Not Found";
	const description =
		metaData["og:description"] ||
		metaData.description ||
		"Description Not Found";
	const image: string | null = metaData["og:image"] || metaData.image || null;
	const favicon =
		metaData.favicons?.length > 0
			? getFaviconUrl(metaData.favicons[0].href, metaData.url)
			: "";

	return (
		<div className="max-w-lg mx-auto border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800">
			<div className="p-4 dark:text-gray-300">
				<div className="flex items-center space-x-2">
					{favicon && <img src={favicon} alt="Favicon" className="w-4 h-4" />}{" "}
					{/* Small favicon image */}
					<span className="text-sm text-green-700 hover:text-green-900 dark:text-green-400">
						{url}
					</span>
				</div>

				<h2 className="text-md text-gray-900 font-semibold mt-1 dark:text-white">
					{title}
				</h2>
				<p className="text-sm text-gray-700 mt-1 dark:text-gray-300">
					{description}
				</p>
			</div>
			{image !== null ? (
				<img
					src={image}
					alt={title}
					className="w-full object-cover rounded-b-lg dark:opacity-90"
					style={{ height: "150px" }}
				/>
			) : (
				<ExclamationCircleIcon className="m-12 w-12 h-12 mx-auto text-gray-400" />
			)}
		</div>
	);
};
