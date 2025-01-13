import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'dist', // Output directory for production build
	},
	base: './', // Ensures all assets are served with relative paths
});
