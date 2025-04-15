import { consoleExist, consoleError } from './helper/index.mjs';
import validator from 'html-validator';
import fs from 'fs-extra';
import fg from 'fast-glob';
import config from '../project.config.js';

const options = {
  url: 'http://url-to-validate.com',
  format: 'json',
};

const init = async () => {
  await fs.remove('./report-w3c.txt');

  const targetFiles = fg.sync(`${config.out}/*.html`);
  if (targetFiles.length === 0) {
    consoleExist('html');
    return;
  }
  const stream = fs.createWriteStream('./report-w3c.txt', { flags: 'a' });

  for (const file of targetFiles) {
    options.data = fs.readFileSync(file, 'utf8');
    try {
      const result = await validator(options);
      stream.write(`===========================\n>> ${file}\n`);
      if (result.messages.length === 0) {
        stream.write(`\n✨ No errors or warnings to show.\n`);
      } else {
        result.messages.forEach((msg) => {
          stream.write(`\n[${msg.type}] line: ${msg.lastLine}\n${msg.message}\n`);
        });
      }
      stream.write(`\n`);
    } catch (error) {
      consoleError(error);
    }
  }
};

init();
