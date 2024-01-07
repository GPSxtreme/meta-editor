"use client";

import { useGeneratedOutput } from "@/app/state/generatedOutput";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const output = useGeneratedOutput((state) => state.output);
  const router = useRouter();

  useEffect(() => {
    if (output == null) router.push("/generate");
  }, [output, router]);

  return <div>{JSON.stringify(output)}</div>;
};

export default Page;
