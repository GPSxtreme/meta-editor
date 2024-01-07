"use client";
import { useAction } from "next-safe-action/hooks";
import { FormEvent } from "react";
import { GenerateMetatagsInput, generateMetatags } from "./actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  pageMetaData,
  projectMetaData,
  robotCheckboxes,
  settingsCheckboxes,
} from "../lib/data";
import { useGeneratedOutput } from "../state/generatedOutput";
import { useRouter } from "next/navigation";

export default function MetaForm() {
  const { execute, status, result } = useAction(generateMetatags, {
    onSuccess: (data)=>{
      setOutput(result.data as string);
      router.push("/generate/success");
    }
  });
  const setOutput = useGeneratedOutput((state) => state.setOutput);
  const router = useRouter();

  const textInputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(
      Array.from(formData.entries()).filter(([_, value]) => value != "")
    ) as Partial<GenerateMetatagsInput>;
     execute(data as GenerateMetatagsInput);
  };
  return (
    <>
      <div className="mt-4 min-h-screen">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* GENERAL SETTINGS */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold underline underline-offset-8">
              General settings ⚙️
            </h1>
            <p>
              These settings will be used to generate the meta tags. enable or
              disable as per your needs.
            </p>
            <div className="flex flex-col">
              {settingsCheckboxes.map((checkbox, index) => (
                <div key={index} className="mb-4 flex flex-row gap-1">
                  <input
                    type="checkbox"
                    name={checkbox.name}
                    id={checkbox.id}
                    about={checkbox.about}
                    className="mr-2"
                    defaultChecked
                  />
                  <label
                    htmlFor={checkbox.id}
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    {checkbox.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-2 border-[#E5E7EB] dark:border-[#90909084]" />
          {/* ROBOTS SETTINGS */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold underline underline-offset-8">
              Robot settings 🤖
            </h1>
            <p>Control bots behaviour on your site.</p>
            <div className="flex flex-col">
              {robotCheckboxes.slice(0, 3).map((checkbox, index) => (
                <div key={index} className="mb-4 flex flex-row gap-1">
                  <input
                    type="checkbox"
                    name={checkbox.name}
                    id={checkbox.id}
                    about={checkbox.about}
                    className="mr-2"
                  />
                  <label
                    htmlFor={checkbox.id}
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    {checkbox.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-2 border-[#E5E7EB] dark:border-[#90909084]" />
          {/* PROJECT SETTINGS */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold underline underline-offset-8">
              Project settings ⚙️
            </h1>
            <p>
              These settings will be used to generate meta tags that represent
              your project data.
            </p>
            <div className="flex flex-col">
              {projectMetaData.map((input, index) => (
                <div key={index} className="mb-4 flex flex-col gap-2">
                  {input.type != "color" ? (
                    <>
                      <label htmlFor={input.name}>{input.label}</label>
                      <input
                        key={input.key}
                        type={input.type}
                        name={input.name}
                        id={input.id}
                        placeholder={input.placeholder}
                        className={textInputStyle}
                        required={input.required}
                      />
                    </>
                  ) : (
                    <div className="flex flex-row">
                      <input
                        key={input.key}
                        type={input.type}
                        name={input.name}
                        id={input.id}
                        placeholder={input.placeholder}
                        className="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-1/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                      />
                      <label
                        htmlFor={input.id}
                        key={input.key}
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        {input.label}
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <hr className="my-2 border-[#E5E7EB] dark:border-[#90909084]" />
          {/* PAGE SETTINGS */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold underline underline-offset-8">
              Page settings ⚙️
            </h1>
            <p>
              These settings will be used to generate meta tags that represent
              your page data.
            </p>
            <div className="flex flex-col">
              {pageMetaData.map((input, index) => (
                <div key={index} className="mb-4 flex flex-col gap-1">
                  {input.required ? (
                    <>
                      <label htmlFor={input.name}>*{input.label}</label>
                      <input
                        key={input.key}
                        type={input.type}
                        name={input.name}
                        id={input.id}
                        placeholder={input.placeholder}
                        className={textInputStyle}
                        required
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor={input.name}>{input.label}</label>
                      <input
                        key={input.key}
                        type={input.type}
                        name={input.name}
                        id={input.id}
                        placeholder={input.placeholder}
                        className={textInputStyle}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            value="Generate"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 flex items-center justify-center"
            disabled={status === "executing"}
          >
            {status === "executing" ? (
              <div className="m-auto">
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              "Generate"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
