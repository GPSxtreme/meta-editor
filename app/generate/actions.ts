"use server";

import { z } from "zod";
import { action } from "@/lib/safe-action";
import { metapatcher } from "metapatcher";

const dataSchema = z.object({
  // SETTINGS==========
  structuredData: z.enum(["off", "on"]).default("on"), // Enables or disables the generation of structured data
  androidChromeIcons: z.enum(["off", "on"]).default("on"), // Enables or disables the generation of Android Chrome icons
  msTags: z.enum(["off", "on"]).default("on"), // Enables or disables the generation of Microsoft tags
  safariTags: z.enum(["off", "on"]).default("on"), // Enables or disables the generation of Safari tags
  appleTags: z.enum(["off", "on"]).default("on"), // Enables or disables the generation of Apple tags
  openGraphTags: z.enum(["off", "on"]).default("on"), // Enables or disables the generation of Open Graph tags
  twitterTags: z.enum(["off", "on"]).default("on"), // Enables or disables the generation of Twitter tags
  facebookTags: z.enum(["off", "on"]).default("on"), // Enables or disables the generation of Facebook tags

  //ROBOTS=========
  allow: z.enum(["off", "on"]).default("off"),
  /*
   *This line sets the robots directive to "noindex".
   *This means that the page should not be indexed by search engines.
   *It's often used for pages that contain sensitive information or are
   *not meant to be publicly accessible.
   */
  disallow: z.enum(["off", "on"]).default("on"),
  /*
   *This line sets the robots directive to "nofollow".
   *This means that the page should not be followed by search engines.
   *This is useful if you have links on your site that point to other sites,
   *such as social media profiles or blog posts.
   */
  followLinks: z.enum(["off", "on"]).default("off"),

  // METADATA DATA===========
  // PROJECT METADATA========
  name: z.string(), // The name of the project
  projectUrl: z.string().url(), // The URL of the project
  logo: z.string().url().optional(), // The URL of the project's logo
  primaryColor: z.string().optional(), // The primary color of the project
  backgroundColor: z.string().optional(), // The background color of the project
  // SITE METADATA============
  title: z.string().min(1).max(70), // The title of the page
  description: z.string().min(1).max(150), // The description of the page
  pageUrl: z.string().url(), // The URL of the page
  author: z.string().optional(), // The author of the page
  image: z.string().url().optional(), // The URL of the page's image
  locale: z.string().optional(), // The locale of the page
  localVersions: z.array(z.object({}).optional()).optional(), // An array of local versions of the page
  canonicals: z.array(z.string().optional()).optional(), // An array of canonical URLs for the page
  prioritizationData: z
    .array(
      z
        .object({
          // Data for prioritizing resource loading
          url: z.string(), // The URL of the resource
          strategy: z.enum([
            // The strategy for prioritizing the resource
            "preconnect",
            "prefetch",
            "dns-prefetch",
            "preload",
            "prerender",
          ]),
        })
        .optional()
    )
    .optional(),
});

export type GenerateMetatagsInput = z.infer<typeof dataSchema>;

export const generateMetatags = action(dataSchema, async (data) => {
  // process input
  // no need to run configure if you are okay with the default settings
  metapatcher.configure({
    structuredData: { enabled: data.structuredData === "on" },
    androidChromeIcons: { enabled: data.androidChromeIcons === "on" },
    msTags: { enabled: data.msTags === "on" },
    safariTags: { enabled: data.safariTags === "on" },
    appleTags: { enabled: data.appleTags },
    openGraphTags: { enabled: data.openGraphTags === "on" },
    twitterTags: { enabled: data.twitterTags === "on" },
    facebookTags: { enabled: data.facebookTags === "on" },
  });
  // set application name, url and logo across devices and browsers
  // returns self
  metapatcher.setProjectMeta({
    name: data.name,
    url: data.projectUrl,
    logo: data.logo,
    primaryColor: data.primaryColor,
    backgroundColor: data.backgroundColor,
  });
  // set robots directives, returns the node element
  metapatcher.robots("noindex");
  metapatcher.robots("index, nofollow");
  // reference for google can be found at:
  // https://developers.google.com/search/reference/robots_meta_tag

  // prioritize loading resources, returns the node element
  data.prioritizationData?.map((element?) =>
    metapatcher.prioritize(element?.url, element?.strategy)
  );

  // document title, meta name and description, social media, canonical, hreflang
  // and other applicable tags
  // returns self
  metapatcher.setPageMeta({
    title: data.title,
    description: data.description,
    url: data.pageUrl,
    image: data.image,
    locale: data.locale,
    localVersions: data.localVersions,
    canonicals: data.canonicals,
    author: data.author,
  });
  const dump = metapatcher.dump();
  return dump;
});
