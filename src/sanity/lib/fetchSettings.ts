import { client } from "./client";
import { siteSettingsQuery } from "./queries";
import type { SiteSettings } from "../types/sanity";

export async function fetchSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery);
}
