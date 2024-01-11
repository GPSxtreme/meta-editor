'use client'
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast"


export default function HomePage() {
  const {theme} = useTheme();
  const { toast } = useToast()
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-start space-y-4 flex flex-col gap-3 my-4">
        <div className="flex flex-col gap-3">
      <p className="text-lg font-medium">Check your website&apos;s metadata</p>
        <div className="flex flex-row gap-3">
      <Input type="url" placeholder="Website address" />
      <Button
      onClick={() => {
        toast({
          title: "Action unavailable 😅",
          description: "Coming soon 🚀",
        })
      }}
      >{<ArrowRightIcon  className="h-5 w-5 text-white" />}</Button>
    </div>
    </div>
    <div className="flex flex-col gap-3">
    <p className="text-lg font-medium">Or jump into generating your own metadata</p>
          <Link href="/generate" className="flex flex-row justify-center pt-2">
            <Button className="w-full" >
              Generate
              <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
            </Button>
          </Link>
        </div>
        <hr className="my-2 border-[#E5E7EB] dark:border-[#90909084]" />
      <Image
          src={`/images/home-preview-${theme === "dark" ? "dark" : "light"}.png`}
          alt="before and after image of using metadata"
          width={800}
          height={400}
          />
        <p className="pt-5 pb-3 text-sm md:text-xl max-w-full md:max-w-3xl mx-auto mt text-justify">
          Meta data is crucial for every website. It provides information about
          your webpage to search engines and helps them understand what your
          site is about. This information is used to determine whether your site
          is relevant to the search query, and if it is, how high it should
          appear in the search results.
        </p>
      </div>
    </div>
  );
}
