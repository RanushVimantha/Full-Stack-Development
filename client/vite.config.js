import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      'application/javascript': ['.js', '.jsx'],
    },
  },
});
