module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint/eslint-plugin"],
	extends: ["plugin:@typescript-eslint/recommended", "universe/node"],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: [
		"*.js",
		"*.mjs",
		"*.cjs",
		"tsup.config.ts",
		"dist",
		"node_modules",
		"jest.config.*",
		"__tests__",
		"__mocks__",
		".npmrc",
	],
	rules: {
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/prefer-readonly": "error",
		"no-else-return": ["error", { allowElseIf: false }],
		"no-console": "warn",
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "class",
				format: ["PascalCase"],
			},
		],
		"@typescript-eslint/consistent-type-imports": "error",
		"@typescript-eslint/consistent-type-exports": "error",
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit",
				overrides: {
					accessors: "explicit",
					constructors: "no-public",
					methods: "explicit",
					properties: "explicit",
					parameterProperties: "explicit",
				},
			},
		],
		"@typescript-eslint/no-unnecessary-condition": "error",
	},
};
