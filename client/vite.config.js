import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Ensure modern JavaScript compatibility
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve these extensions
  },
});
