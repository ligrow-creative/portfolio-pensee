import { consoleExist, consoleGenerate } from './helper/index.mjs';
import config from '../project.config.js';
import svgstore from 'svgstore';
import fs from 'fs-extra';
import fg from 'fast-glob';
import path from 'path';

const options = {
  cleanSymbols: ['fill', 'stroke', 'stroke-linejoin', 'stroke-width'],
};

/* init */
const sprites = svgstore();
const init = () => {
  const targetSvg = fg.sync('./src/svg/*.svg');

  if (targetSvg.length === 0) {
    consoleExist('SVG');
    return;
  }

  targetSvg.forEach((file) => {
    const svgId = path.parse(file).name;
    const code = fs.readFileSync(file, { encoding: 'utf-8' });
    sprites.add(svgId, code, options);
  });
  const svg = sprites
    .toString({ inline: true })
    .replace(
      `<svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`,
    );
  const outDir = `./${config.out}/${config.assets.sprite.outDir}/`;
  const dist = `${outDir}/${config.assets.sprite.outName}.svg`;
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(dist, svg);
  consoleGenerate();
};

init();
