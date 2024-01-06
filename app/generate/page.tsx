"use client";
import { useAction } from "next-safe-action/hooks";
import { FormEvent, useEffect } from "react";
import { GenerateMetatagsInput, generateMetatags } from "./actions";

export default function MetaForm() {
  const { execute, status, result } = useAction(generateMetatags);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as GenerateMetatagsInput;
    execute(data);
  };

  useEffect(() => {
    const session = {
      user: {
        name: "prudhvi",
      },
    };
    document.cookie = `session=${JSON.stringify(session)}`;
  }, []);

  return (
    <>
      GOT OUTPUT: {JSON.stringify(result, null, 4)}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
        <div className="w-full md:w-1/2 p-6">
          <form
            className="w-full max-w-lg mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="description" placeholder="Description" />
            <input type="text" name="url" placeholder="URL" />
            <input type="text" name="author" placeholder="Author" />
            {/* <input type="text" name="img" placeholder="Image URL" />
          <input type="text" name="img_alt" placeholder="Image Alt Text" /> */}
            {/* <input
            type="text"
            name="twitter_card_type"
            placeholder="Twitter Card Type"
          />
          <input
            type="text"
            name="twitter_handle"
            placeholder="Twitter Handle"
          />
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="generator" placeholder="Generator" />
          <input type="checkbox" name="comments" />
          <input
            type="text"
            name="css"
            placeholder="CSS Files (comma separated)"
          />
          <input
            type="text"
            name="js"
            placeholder="JS Files (comma separated)"
          />
          <textarea name="inline_css" placeholder="Inline CSS" />
          <textarea name="inline_js" placeholder="Inline JS" /> */}
            <button type="submit" value="Generate">
              Generate
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
