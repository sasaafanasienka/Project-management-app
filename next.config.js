/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'rs.school',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
