/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest",
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	transformIgnorePatterns: [
		"node_modules/(?!(expo-secure-store|expo-modules-core)/)",
	],
	setupFiles: ["./jestSetupFile.js"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
