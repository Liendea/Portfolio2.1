import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Statisk QR-kod på CV:t pekar hit - byt destination när CV:t uppdateras
      {
        source: "/cv",
        destination:
          "https://cdn.sanity.io/files/odrlfk1c/production/82e2eed184e77fa1aeab4bbf39900d316c059790.pdf",
        permanent: false,
      },
    ];
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // Lägg till andra externa domäner här om du använder dem, t.ex.:
      // {
      //   protocol: "https",
      //   hostname: "example.com",
      // },
    ],
  },
};

export default nextConfig;
