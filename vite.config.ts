import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteSingleFile } from "vite-plugin-singlefile";
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteSingleFile(),
		viteMockServe({
			mockPath: 'mock',
		})
	],
});
