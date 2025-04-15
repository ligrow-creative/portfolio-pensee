import { consoleExist, consolePreview, consoleGenerate, consoleError } from './helper/index.mjs';
import config from '../project.config.js';
import webfontsGenerator from '@vusion/webfonts-generator';
import fs from 'fs-extra';
import fg from 'fast-glob';
const isDev = process.env.NODE_ENV !== 'production';
const outDir = `${config.out}/${config.assets.icons.outDir}`;
const outName = `${config.assets.icons.outName}`;

/* init */
const init = () => {
  const targetSvg = fg.sync('./src/icons/*.svg');

  if (targetSvg.length === 0) {
    consoleExist('SVG');
    return;
  }

  webfontsGenerator(
    {
      files: targetSvg,
      dest: outDir,
      fontName: outName,
      types: ['woff2', 'woff'],
      startCodepoint: 0xf001,
      writeFiles: false,
      cssTemplate: './src/icons/templates/css.hbs',
      cssContext: (context, options, handlebars) => {
        handlebars.registerHelper(
          'unescape-double-quote',
          (string) => new handlebars.SafeString(string),
        );
        context.outputCss = Object.entries(context.codepoints).map(([k, v]) => [
          k.replace(/^[0-9]{3}-/, ''),
          v.toString(16).toUpperCase(),
        ]);
      },
      htmlTemplate: './src/icons/templates/html.hbs',
      htmlContext: (context, options, handlebars) => {
        context.unicode = Object.entries(context.codepoints).map(([k, v]) => [
          k.replace(/^[0-9]{3}-/, ''),
          v.toString(16).toUpperCase(),
        ]);
      },
      templateOptions: {
        classPrefix: 'u-icon-',
        baseSelector: '.u-icon',
      },
    },
    (error, result) => {
      if (error) {
        consoleError(error);
      } else {
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        fs.writeFileSync(`${outDir}/${outName}.woff2`, result.woff2);
        fs.writeFileSync(`${outDir}/${outName}.woff`, result.woff);
        fs.writeFileSync(`${outDir}/${outName}.css`, result.generateCss());

        if (isDev) {
          fs.writeFileSync(`${outDir}/index.html`, result.generateHtml());
          consolePreview(
            `http://localhost:${config.browser.port}/${config.assets.icons.outDir}/index.html`,
          );
        }
        consoleGenerate();
      }
    },
  );
};

init();
