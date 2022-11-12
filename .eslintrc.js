module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'next/core-web-vitals',
		'plugin:react/recommended',
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	plugins: [
		'unicorn',
	],
	rules: {
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'linebreak-style': 0,
		'no-multiple-empty-lines': [1, { max: 2 }],
		'react/react-in-jsx-scope': 'off',
		indent: [1, 'tab'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'unicorn/prefer-add-event-listener': [
			'error', {
				excludedPackages: [
					'koa',
					'sax',
				],
			},
		],
	},
};

