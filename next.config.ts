import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn.sanity.io", // <--- DENNA RAD MÅSTE LÄGGAS TILL
      // Lägg till andra externa domäner här om du använder dem
    ],
  },
};

export default nextConfig;
