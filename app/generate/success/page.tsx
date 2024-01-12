"use client";

import { useGeneratedOutput } from "@/app/state/generatedOutput";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CopyBlock, atomOneLight, dracula } from "react-code-blocks";
import { generateHtmlFileContent } from "@/app/lib/utils";
import { saveAs } from "file-saver";
import UploadFileComponent from "@/app/components/uploadHtmlFile";
import { Button } from "@/app/components/ui/button";

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
	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-2xl font-bold underline underline-offset-8">
				Copy code ✨
			</h1>
			<p>
				Copy the below tags and paste them inside the
				<code>{String(" <head>...</head> ")}</code>
				tag in your <code>index.html</code>
			</p>
			<div>
				<CopyBlock
					text={output || ""}
					language="html"
					showLineNumbers={true}
					theme={theme === "dark" ? dracula : atomOneLight}
					customStyle={{
						padding: "1rem",
						overflow: "auto",
					}}
				/>
			</div>

			<hr className="my-2 border-[#E5E7EB] dark:border-[#90909084]" />
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold underline underline-offset-8">
					Generate file 🤖
				</h1>
				<p>
					Too complex to do it yourself? download a injected
					<code> index.html</code> file with the generated tags.
				</p>
				<Button
					onClick={generateFile}
					className="inline-flex max-w-32 gap-2 items-center"
				>
					Download {<ArrowDownTrayIcon className="h-4 w-4" />}
				</Button>
			</div>
			<hr className="my-2 border-[#E5E7EB] dark:border-[#90909084]" />
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold underline underline-offset-8">
					Upload file 📁
				</h1>
				<p>
					Upload your <code>index.html</code> and get it injected with the
					generated meta tags.
				</p>
				<UploadFileComponent metaTags={output || ""} />
			</div>
		</div>
	);
};

export default Page;
