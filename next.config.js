/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
	images: {
		domains: [
			'rs.school',
			'avatars.githubusercontent.com',
		],
	},
};

module.exports = nextConfig;
