import { consoleDone, consoleError } from './helper/index.mjs';
import config from '../project.config.js';
import fs from 'fs-extra';

/* init */
const cleanup = async () => {
  try {
    await fs.remove(`${config.clean.out}`);
    consoleDone();
  } catch (err) {
    consoleError(err);
  }
};

cleanup();
