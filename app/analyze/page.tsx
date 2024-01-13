"use client";
import {
	FacebookCard,
	GoogleCard,
	LinkedinCard,
	PinterestCard,
	SlackCard,
	TwitterCard,
} from "@/app/components/analyze/cards";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/components/ui/use-toast";
import {
	ArrowPathIcon,
	ArrowRightIcon,
	CodeBracketIcon,
	ClipboardIcon,
	PhotoIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import { FormEvent, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	oneDark,
	oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { UrlMetadata, fetchSiteMetaData } from "./actions";
import { isValidUrl } from "../lib/helpers/isValidUrl";

export default function AnalyzeUrlPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(true);
	const [metaData, setMetaData] = useState<UrlMetadata | null>({});
	const { theme } = useTheme();

	useEffect(() => {
		const fetchDataInEffect = async () => {
			const url = searchParams.get("url")?.trim();
			if (url?.length && isValidUrl(url)) {
				setIsLoading(true);
				const siteMetadata = await fetchSiteMetaData(url);
				setIsLoading(false);
				setMetaData(siteMetadata);
			}
		};
		fetchDataInEffect();
	}, [searchParams]);

	const handleUrlSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const url = formData.get("url") as string;
		router.push(`/analyze?url=${url}`);
	};
	function extractHeadContent() {
		// Use the DOMParser API to parse the HTML string
		const parser = new DOMParser();
		const doc = parser.parseFromString(
			(metaData?.responseBody || "") as string,
			"text/html",
		);

		// Extract the head element
		const head = doc.head;
		// Extract only the meta tags and title tag from the head
		const metaTags = head.querySelectorAll("meta");
		const titleTag = head.querySelector("title");

		// Create an array to store the HTML strings of the tags
		const headContent = [];

		// Add the title tag HTML if it exists
		if (titleTag) {
			headContent.push(titleTag.outerHTML);
		}

		// Add the HTML of each meta tag
		for (const tag of metaTags) {
			headContent.push(tag.outerHTML);
		}

		// Return the extracted HTML as a string
		return headContent.join("\n");
	}

	const handleCopyToClipboard = () => {
		const headContent = extractHeadContent();
		navigator.clipboard.writeText(headContent);
		toast({
			title: "Copied to clipboard",
			description: "The HTML meta tags have been copied to your clipboard.",
		});
	};

	return (
		<div className="min-h-[80vh] flex items-start justify-center">
			{!isLoading ? (
				<div className="flex flex-col md:flex-row gap-4 md:mx-4">
					<div className="mt-5 h-[calc(100vh-135px)] overflow-y-auto flex-1 space-y-3">
						<form onSubmit={handleUrlSubmit} className="flex flex-row gap-3">
							<Input
								type="url"
								name="url"
								required
								defaultValue={searchParams.get("url") || ""}
							/>
							<Button type="submit">
								{<ArrowRightIcon className="h-5 w-5 text-white" />}
							</Button>
						</form>
						<h1 className="text-2xl flex items-center gap-3">
							Copy
							<CodeBracketIcon className="h-7 w-7 text-violet-500" />
						</h1>
						<p>
							Copy the HTML meta tags for your site. Insert these tags in your{" "}
							{"site's"} head section for improved social sharing and SEO.
						</p>
						<div className="max-w-[95vw] md:max-w-[50vw]">
							<SyntaxHighlighter
								language="html"
								style={theme === "dark" ? oneDark : oneLight}
							>
								{extractHeadContent()}
							</SyntaxHighlighter>
						</div>
						<Button className="w-full" onClick={handleCopyToClipboard}>
							<ClipboardIcon className="h-6 w-6" />
							copy to clipboard
						</Button>
					</div>
					<div className="mt-5 h-[calc(100vh-135px)] overflow-y-auto flex-1 space-y-3">
						<h1 className="text-2xl flex items-center gap-3">
							Preview
							<PhotoIcon className="h-7 w-7 text-violet-500" />
						</h1>
						<p>
							See how your website will look on social media platforms. This
							live preview ensures your metadata aligns with your content and
							branding.
						</p>
						{!!metaData && (
							<>
								<p className="text-sm text-gray-500">Google</p>
								<GoogleCard metaData={metaData} />
								<p className="text-sm text-gray-500">Twitter</p>
								<TwitterCard metaData={metaData} />
								<p className="text-sm text-gray-500">Facebook</p>
								<FacebookCard metaData={metaData} />
								<p className="text-sm text-gray-500">LinkedIn</p>
								<LinkedinCard metaData={metaData} />
								<p className="text-sm text-gray-500">Pinterest</p>
								<PinterestCard metaData={metaData} />
								<p className="text-sm text-gray-500">Slack</p>
								<SlackCard metaData={metaData} />
							</>
						)}
					</div>
				</div>
			) : (
				<div className="m-auto">
					<ArrowPathIcon className="animate-spin h-8 w-8 text-violet-500" />
				</div>
			)}
		</div>
	);
}
