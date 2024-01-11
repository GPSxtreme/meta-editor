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
} from "@/lib/data.js";
import { useGeneratedOutput } from "../state/generatedOutput";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MetaForm() {
  const { execute, status, result } = useAction(generateMetatags, {
    onSuccess: (data)=>{
      setOutput(data as string);
      router.push("/generate/success");
    }
  });
  const setOutput = useGeneratedOutput((state) => state.setOutput);
  const router = useRouter();

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
                      <label htmlFor={input.name}>{`${input.required ? "*" : ""}${input.label}`}</label>
                      <Input
                        key={input.key}
                        type={input.type}
                        name={input.name}
                        id={input.id}
                        placeholder={input.placeholder}
                        required={input.required}
                      />
                    </>
                  ) : (
                    <div className="flex flex-row items-center gap-3">
                      <input
                        key={input.key}
                        type={input.type}
                        name={input.name}
                        id={input.id}
                        placeholder={input.placeholder}
                        className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer w-10 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
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
                      <Input
                        key={input.key}
                        type={input.type}
                        name={input.name}
                        id={input.id}
                        placeholder={input.placeholder}
                        required
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor={input.name}>{input.label}</label>
                      <Input
                        key={input.key}
                        type={input.type}
                        name={input.name}
                        id={input.id}
                        placeholder={input.placeholder}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            value="Generate"
            disabled={status === "executing"}
          >
            {status === "executing" ? (
              <div className="m-auto">
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              "Generate"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
