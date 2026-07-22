import { createClient } from "next-sanity";


export const client = createClient({

  projectId: "5lqvthvr",

  dataset: "production",

  apiVersion: "2026-01-01",

  useCdn: false,

});
