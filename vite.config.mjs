import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import config from './project.config.js';
import autoprefixer from 'autoprefixer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import postcssEasings from 'postcss-easings';
const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  base: config.base,
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src/scripts'),
    },
  },
  logLevel: 'warn',
  server: {
    cors: true,
    strictPort: true,
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    sourcemap: isDev,
    outDir: config.out,
    emptyOutDir: false,
    minify: 'terser',
    terserOptions: {
      mangle: true,
      toplevel: true,
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      input: {
        main: './src/entry.ts',
      },
      output: {
        manualChunks: undefined,
        entryFileNames: `${config.assets.javascript.outDir}/${config.assets.javascript.outName}.js`,
        chunkFileNames: `${config.assets.javascript.outDir}/[name].js`,
        assetFileNames: (chunkInfo) => resolveAssetFileName(chunkInfo),
      },
    },
    chunkSizeWarningLimit: 3000,
  },
  css: {
    postcss: {
      plugins: [autoprefixer, postcssSortMediaQueries, postcssEasings],
    },
  },
});

const resolveAssetFileName = (chunkInfo) => {
  const imgExt = ['jpg', 'jpeg', 'gif', 'png', 'webp', 'svg'];
  const cssExt = ['css'];
  const fileExtname = chunkInfo.name && path.extname(chunkInfo.name);
  const fileExt = fileExtname && fileExtname.slice(1);
  const fileName = chunkInfo.name && path.basename(chunkInfo.name);

  if (fileExt && imgExt.includes(fileExt)) {
    return `${config.assets.images.outDir}/${fileName}`;
  } else if (fileExt && cssExt.includes(fileExt)) {
    return `${config.assets.styles.outDir}/${config.assets.styles.outName}.${fileExt}`;
  } else {
    return `${chunkInfo.name}`;
  }
};
