/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		// HOST
		HOST_API_KEY: "http://localhost:5050/",
	},
};

module.exports = nextConfig;
