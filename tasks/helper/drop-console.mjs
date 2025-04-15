import chalk from 'chalk';
import fancyLog from 'fancy-log';
import fs from 'fs-extra';
import prettyBytes from 'pretty-bytes';
import path from 'path';
import util from 'util';
util.inspect.styles.date = 'gray';

const taskName = path.basename(process.argv[1], '.mjs');

export const consoleSize = async (file) => {
  const { size } = await fs.statSync(file);
  fancyLog(`${chalk.blue(file)} ${chalk.magenta(prettyBytes(size))}`);
};

export const consoleExist = (file, task = taskName) => {
  console.log(`${chalk.gray(`[${task}]`)} ${chalk.red(`${file} File does not exist`)}`);
};

export const consoleError = (text, task = taskName) => {
  console.log(`${chalk.gray(`[${task}]`)} ${chalk.red(text)}`);
};

export const consoleGenerate = (task = taskName) => {
  console.log(`${chalk.gray(`[${task}]`)} ${chalk.blue('Generate')}`);
};

export const consoleDone = (task = taskName) => {
  console.log(`${chalk.gray(`[${task}]`)} ${chalk.white('Done✨')}`);
};

export const consolePreview = (url, task = taskName) => {
  console.log(`${chalk.gray(`[${task}]`)} Preview >> ${chalk.yellow(`${url}`)}`);
};
