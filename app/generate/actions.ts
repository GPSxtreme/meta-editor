"use server";

import { z } from "zod";
import { action } from "../lib/safe-action";
// import { Metapatcher } from "metapatcher";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  author: z.string().nullable(),
  url: z.string().url(),
});

export type GenerateMetatagsInput = z.infer<typeof schema>;

export const generateMetatags = action(
  schema,
  async ({ author, url, description, title }) => {
    // TODO: process input
    return `Your ${url} and ${title} are great ! so here is your ${author} and ${description}`;
  }
);
