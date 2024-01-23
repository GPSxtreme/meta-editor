import { Skeleton } from "../ui/skeleton";

export default function AnalyzeSkeleton() {
  return (
    // Use 'md:flex-row' to arrange children in a row on medium screens and above
    // 'flex-col' will stack the children in a column on small screens by default
    <div className="flex flex-col md:flex-row gap-4 h-[80vh] w-[90vw] mt-5">

      {/* Code Section */}
      {/* 'md:w-1/2' sets the width to 50% on medium screens and above
      'w-full' sets the width to 100% on small screens */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <div className="flex flex-row gap-3 w-full">
        <Skeleton className="w-[85%] md:w-[90%] h-10" />
        <Skeleton className="w-[15%] md:w-[10%] h-10" />
        </div>
        <Skeleton className="w-[15%] h-6 md:h-12" />
        <Skeleton className="w-full h-4 md:h-6" />
        {/* code block */}
        <Skeleton className="w-full h-[30vh] md:h-full" />
      </div>

      {/* Preview Section */}
      {/* 'md:w-1/2' sets the width to 50% on medium screens and above */}
      {/* 'w-full' and 'order-first' on small screens will make it stack below the code section */}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
      <Skeleton className="w-[20%] h-10" />
        <Skeleton className="w-full h-8" />
      <Skeleton className="w-[10%] h-4" />
      <Skeleton className="w-full h-[15%]" />
      <Skeleton className="w-[10%] h-4" />
      <Skeleton className="w-[60%] h-[8vh] md:h-[40%] mx-auto" />
      </div>
    </div>
  );
}
