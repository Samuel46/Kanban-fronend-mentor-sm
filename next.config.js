/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		// HOST
		HOST_API_KEY: "https://kanban-frontend-mentor-backend-production.up.railway.app/",
	},
};

module.exports = nextConfig;
