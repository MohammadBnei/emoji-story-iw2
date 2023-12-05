/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config) {
    config.externals.push({
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    });
    config.resolve.symlinks = false;
    return config;
  },
};

module.exports = nextConfig;
