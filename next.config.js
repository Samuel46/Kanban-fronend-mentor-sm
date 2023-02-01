/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		// HOST
		HOST_API_KEY: "http://localhost:5050/",
	},
};

module.exports = nextConfig;
