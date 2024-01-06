import type { Metadata } from "next";
import { openSans, pacifico } from "./ui/fonts";
import "./globals.css";
import Link from "next/link";
import ThemeSwitch from "./ui/components/ThemeSwitch";
import Providers from "./providers";
export const metadata: Metadata = {
  title: { default: "Meta editor", template: "%s | Meta editor" },
  description: "Generate metadata for your website within seconds 🚀",
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
          <nav className="flex flex-row justify-between m-3 p-3 border-b-2 border-dashed border-black dark:border-white">
            <Link
              href={"/"}
              className={`${pacifico.className} text-xl md:text-4xl font-normal logo-hp`}
            >
              {String("<Meta Editor />")}
            </Link>
            <ThemeSwitch />
          </nav>
          <div className="m-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
