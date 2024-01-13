"use client";

import { useGeneratedOutput } from "@/app/state/generatedOutput";
import {
	ArrowDownTrayIcon,
	ClipboardIcon,
	CodeBracketSquareIcon,
	DocumentArrowDownIcon,
	DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	oneDark,
	oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { generateHtmlFileContent } from "@/app/lib/utils";
import { saveAs } from "file-saver";
import UploadFileComponent from "@/app/components/uploadHtmlFile";
import { Button } from "@/app/components/ui/button";
import { toast } from "@/app/components/ui/use-toast";

const Page = () => {
	const output = useGeneratedOutput((state) => state.output);
	const router = useRouter();
	const { theme } = useTheme();
	useEffect(() => {
		if (output == null) router.push("/generate");
	}, [output, router]);

	function generateFile(): void {
		const result = generateHtmlFileContent(output || "");
		const file = new Blob([result], { type: "text/html" });
		saveAs(file, "index.html");
	}
	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(output || "");
		toast({
			title: "Copied to clipboard",
			description: "The HTML meta tags have been copied to your clipboard.",
		});
	};
	return (
		<div className="flex flex-col gap-4">
			<div className="space-y-1">
				<h1 className="text-2xl font-bold flex gap-3 items-center">
					Copy code
					<CodeBracketSquareIcon className="h-7 w-7 text-violet-500" />
				</h1>
				<p className="text-sm text-gray-500">
					Copy the below tags and paste them inside the
					<code>{String(" <head>...</head> ")}</code>
					tag in your <code>index.html</code>
				</p>
			</div>
			<div>
				<SyntaxHighlighter
					showLineNumbers
					language="html"
					style={theme === "dark" ? oneDark : oneLight}
				>
					{output || ""}
				</SyntaxHighlighter>
			</div>
			<Button className="w-full" onClick={handleCopyToClipboard}>
				<ClipboardIcon className="h-6 w-6" />
				copy to clipboard
			</Button>

			<hr className="my-2 border-[#E5E7EB] dark:border-[#90909084]" />
			<div className="flex flex-col gap-4">
				<div className="space-y-1">
					<h1 className="text-2xl font-bold flex gap-3 items-center">
						Generate file
						<DocumentArrowDownIcon className="h-7 w-7 text-violet-500" />
					</h1>
					<p className="text-sm text-gray-500">
						Too complex to do it yourself? download a injected
						<code> index.html</code> file with the generated tags.
					</p>
				</div>
				<Button
					onClick={generateFile}
					className="inline-flex max-w-32 gap-2 items-center"
				>
					Download {<ArrowDownTrayIcon className="h-4 w-4" />}
				</Button>
			</div>
			<hr className="my-2 border-[#E5E7EB] dark:border-[#90909084]" />
			<div className="flex flex-col gap-4">
				<div className="space-y-1">
					<h1 className="text-2xl font-bold flex gap-3 items-center">
						Upload file
						<DocumentArrowUpIcon className="h-7 w-7 text-violet-500" />
					</h1>
					<p className="text-sm text-gray-500">
						Upload your <code>index.html</code> and get it injected with the
						generated meta tags.
					</p>
				</div>
				<UploadFileComponent metaTags={output || ""} />
			</div>
		</div>
	);
};

export default Page;
