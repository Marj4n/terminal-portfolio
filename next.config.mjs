/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude the font file from being processed by the default Next.js webpack loaders
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf|svg|flf)$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/fonts/[name].[hash].[ext]",
          },
        },
      })
    }
    return config 
  },
}

export default nextConfig
