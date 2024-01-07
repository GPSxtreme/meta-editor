import { useState } from "react";
import { saveAs } from "file-saver"; // Import the file-saver library
import { injectMetaTagsIntoHTML } from "@/app/lib/utils";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function UploadFileComponent({ metaTags }: { metaTags: string }) {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event: any) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDownload = () => {
    if (!file) {
      alert("Please upload a file before downloading.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e: any) {
      const htmlContent = e.target.result;
      const modifiedHTML = injectMetaTagsIntoHTML(metaTags, htmlContent);
      const modifiedFile = new Blob([modifiedHTML], { type: "text/html" });
      saveAs(modifiedFile, "modified.html");
    };

    reader.readAsText(file, "UTF-8");
  };

  return (
    <div>
      <input
        type="file"
        name="file-input"
        id="file-input"
        accept=".html"
        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-violet-500 focus:ring-violet-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
        onChange={handleFileUpload}
      />
      <label
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        HTML
      </label>
      {file && (
        <div className="mt-2">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-violet-800 text-white rounded-sm flex flex-row gap-2 items-center hover:bg-violet-700"
          >
            Download Modified HTML {<ArrowDownTrayIcon className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadFileComponent;
