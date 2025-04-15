import { consoleSize } from './helper/index.mjs';
import config from '../project.config.js';
import fs from 'fs-extra';
import path from 'path';
const isDev = process.env.NODE_ENV !== 'production';
const isWatch = process.argv[2] !== undefined;
const ignoreFile = ['.gitkeep', '.DS_Store'];

/* init */
const isDirectory = (src) => {
  return fs.existsSync(src) && fs.statSync(src).isDirectory();
};

const isTargetFile = (src) => {
  return !ignoreFile.includes(path.basename(src));
};

const copyStaticFolder = async (data) => {
  // .gitignoreファイルに設定されているファイルを除外する場合
  // const gitignore = await fs.readFile('.gitignore', 'utf8');
  // ignoreFile.push(...gitignore.toString().split('\n'))

  await fs.copy(data.base, data.outDir, {
    filter: (target) => {
      const flag = isDirectory(target) || isTargetFile(target);
      if (flag && path.extname(target)) {
        consoleSize(target);
      }
      return flag;
    },
    recursive: true,
  });
};

const copyStaticFile = async (src) => {
  // ignore & file existence check
  const flag = isTargetFile(src) && fs.existsSync(src);
  if (!flag) return;

  const changeFolder = src.replace(/\/([^/]*)\/.*$/, '/$1');
  const target = config.static.filter(({ base }) => base === changeFolder);

  // Exclude non-monitored folders
  if (target.length === 0) return;

  const outSrc = src.replace(target[0].base, target[0].outDir);
  copyStaticFolder({ base: src, outDir: outSrc });
};

/* init */
const init = async () => {
  if (!isWatch) {
    for (const data of config.static) {
      if (data.useProduction) {
        await copyStaticFolder(data);
      } else {
        isDev && (await copyStaticFolder(data));
      }
    }
  } else {
    await copyStaticFile(process.argv[2]);
  }
};

init();
