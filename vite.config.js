import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr'],
});
