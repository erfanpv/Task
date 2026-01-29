/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["employee-react.onrender.com"],
    },
  },
}

module.exports = nextConfig
