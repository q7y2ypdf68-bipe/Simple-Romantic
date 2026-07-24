import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site ships only a small set of already-optimized local images. Serving
  // them directly keeps rendering consistent in every environment and avoids
  // depending on an image transformation binding for these static assets.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
