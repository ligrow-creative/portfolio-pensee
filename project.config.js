const isDev = process.env.NODE_ENV !== 'production';
const output = isDev ? '.app' : 'dist';

module.exports = {
  base: '',
  out: `${output}`,
  assets: {
    javascript: {
      outDir: 'js',
      outName: 'script',
    },
    styles: {
      outDir: 'css',
      outName: 'style',
    },
    images: {
      outDir: 'images',
      outPath: '/images',
      outName: '[name]',
    },
    icons: {
      outDir: 'fonts',
      outName: 'icons',
    },
    sprite: {
      outDir: 'images',
      outName: 'sprite',
    },
  },
  static: [
    {
      base: 'static/root',
      outDir: `${output}`,
      useProduction: true,
    },
  ],
  screens: {
    mobile: 1024,
  },
  browser: {
    port: 8080,
    server: {
      baseDir: output,
    },
  },
  clean: {
    out: output,
  },
};
