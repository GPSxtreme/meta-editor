import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold md:text-6xl mb-5">Meta Editor ✏️</h1>
        <p className="text-sm md:text-xl max-w-full md:max-w-3xl mx-auto">
          Meta data is crucial for every website. It provides information about
          your webpage to search engines and helps them understand what your
          site is about. This information is used to determine whether your site
          is relevant to the search query, and if it is, how high it should
          appear in the search results.
        </p>
        <div className="flex justify-center pt-8">
          <Link href="/generate">
            <span className="inline-flex items-center bg-violet-500 text-white rounded-md px-6 py-2 cursor-pointer transition duration-200 ease-in-out hover:bg-violet-600">
              Generate
              <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
