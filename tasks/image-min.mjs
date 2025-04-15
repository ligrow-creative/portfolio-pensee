import { consoleSize } from './helper/index.mjs';
import config from '../project.config.js';
import imagemin from 'imagemin-keep-folder';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';
const srcDir = process.argv[2] ?? 'src/images/**/*.{jpg,jpeg,png,gif,svg}';

/* init */
imagemin([srcDir], {
  plugins: [
    imageminWebp(),
    imageminSvgo({
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
      ],
    }),
  ],
  replaceOutputDir: (output) => {
    const target = output.replace(/^src\/images/, '');
    const dist = `${config.out}/${config.assets.images.outDir}${target}`;

    return dist;
  },
}).then((files) => {
  files.forEach((f) => consoleSize(f.path));
});
