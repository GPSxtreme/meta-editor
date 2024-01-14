import type { Metadata } from "next";
import { openSans, pacifico } from "./components/fonts";
import "./globals.css";
import Link from "next/link";
import ThemeSwitch from "@/app/components/ThemeSwitch";
import Providers from "./providers";
import { Toaster } from "@/app/components/ui/toaster";
export const metadata: Metadata = {
	title: { default: "Meta editor", template: "%s | Meta editor" },
	description: "Analyze & generate metadata for your website within seconds 🚀",
	icons: {
		shortcut: "/favicon.ico",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "/",
	},
	creator: "Prudhvi Suraaj",
	authors: [{ name: "Prudhvi Suraaj", url: "https://prudhvisuraaj.me" }],
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
	openGraph: {
		title: "Meta editor",
		description:
			"Analyze & generate metadata for your website within seconds 🚀",
		url: "https://meta-editor.vercel.app",
		siteName: "Meta editor",
		images: [
			{
				url: "https://i.ibb.co/2vfWtwm/banner.png",
				width: 1200,
				height: 630,
			},
		],
		locale: "en-US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Meta editor",
		description:
			"Analyze & generate metadata for your website within seconds 🚀",
		creator: "Prudhvi Suraaj",
		images: [
			{
				url: "https://i.ibb.co/2vfWtwm/banner.png",
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${openSans.className}`}>
				<Providers>
					<nav className="flex flex-row justify-between m-3 p-3 border-b-[1px] border-[#E5E7EB] dark:border-[#90909084]">
						<Link
							href={"/"}
							className={`${pacifico.className} text-xl md:text-2xl font-normal`}
						>
							{String("<Meta Editor />")}
						</Link>
						<ThemeSwitch />
					</nav>
					<div className="m-6">{children}</div>
					<Toaster />
					<footer className="mt-5 flex flex-col items-center font-medium gap-3 p-3 border-t-[1px] border-[#E5E7EB] dark:border-[#90909084]">
						<p className="text-center text-xs">
							&copy; {new Date().getFullYear()} Meta Editor
						</p>
						<p className="text-center text-xs">
							Created by{" "}
							<Link
								href="https://prudhvisuraaj.me"
								target="_blank"
								className="text-sky-600"
							>
								prudhvi🫰
							</Link>
						</p>
					</footer>
				</Providers>
			</body>
		</html>
	);
}
