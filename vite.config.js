import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      exclude: /\.stories\.(t|j)sx?$/,
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],

  // Base URL configuration
  base: '/', // Use '/' if serving from bucket root

  build: {
    // Generate static assets with hash for cache busting
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Chunk naming pattern for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // Ensure source maps are disabled for production
    sourcemap: false,

    // Optimize chunks
    chunkSizeWarningLimit: 1000,

    // Generate manifest file for asset tracking
    manifest: true,

    // Optimize loading performance
    reportCompressedSize: false,

    // Clean output directory before build
    emptyOutDir: true,
  },
  server: {
    proxy: {},
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@styles', replacement: fileURLToPath(new URL('./src/styles', import.meta.url)) },
      { find: '@utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url)) },
    ],
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.APP_VERSION || 'development'),
  },
});
