/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export: images are served as-is. All imagery on the site is
    // SVG/CSS-built, so the optimizer is not needed.
    unoptimized: true,
  },
};

export default nextConfig;
