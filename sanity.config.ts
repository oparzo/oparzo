import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "oparzo",

  title: "OPARZO CMS",

  projectId: "5lqvthvr",

  dataset: "production",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
