import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import clear from "rollup-plugin-clear";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import packageJson from "./package.json" assert { type: "json" };

const external = [
	"@reduxjs/toolkit",
	"redux",
	"@react-native-async-storage/async-storage",
	"expo-secure-store",
];

export default defineConfig({
	input: "src/index.ts",
	output: [
		{
			file: packageJson.module,
			format: "esm",
			sourcemap: false,
		},
		{
			file: packageJson.main,
			format: "cjs",
			sourcemap: false,
			interop: "auto",
		},
	],
	external: external,
	plugins: [
		clear({
			targets: ["dist", "types"],
		}),
		terser(),
		nodeResolve(),
		commonjs(),
		typescript({
			declaration: false,
		}),
	],
});
