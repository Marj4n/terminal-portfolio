/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,g
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude the font file from being processed by the default Next.js webpack loaders
      config.module.rules.push({
        test: /\.(flf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash][ext][query]",
        },
      })
    }

    return config
  },
}

export default nextConfig
