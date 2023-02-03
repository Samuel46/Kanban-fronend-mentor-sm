/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		// HOST
		HOST_API_KEY: "https://kanban-frontend-mentor-backend-production.up.railway.app/",
		// HOST_API_KEY: "http://localhost:5050/",
	},
};

module.exports = nextConfig;
