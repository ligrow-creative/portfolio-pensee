const httpProxy = require('http-proxy');
const fs = require('fs-extra');
const path = require('path');
const beautify = require('js-beautify');
const config = require('./project.config.js');
const imageSize = require('image-size');
const imagePath = path.resolve(__dirname, './src/images');
const imageOutDir = path.resolve(__dirname, `${config.out}/${config.assets.images.outDir}`);
const svgPath = path.resolve(__dirname, './src/svg');
const budoux = require('budoux');
const parser = budoux.loadDefaultJapaneseParser();

const beautifyOptions = {
  indent_size: 2,
  max_preserve_newlines: 0,
  indent_inner_html: true,
  extra_liners: [],
  content_unformatted: ['style', 'blockquote', 'script'],
  inline: ['span', 'strong', 'b', 'small', 'del', 's', 'code', 'br', 'wbr'],
};

module.exports = (eleventyConfig) => {
  /* base */
  eleventyConfig.setQuietMode(true);
  eleventyConfig.setUseGitIgnore(false);

  /* Output format */
  eleventyConfig.addTransform('formatHTML', (content, outputPath) => {
    if (!outputPath?.endsWith('.html')) {
      return content;
    }

    return beautify.html(content, beautifyOptions);
  });

  /* Functions */
  eleventyConfig.addJavaScriptFunction('projectConfig', () => config);
  eleventyConfig.addJavaScriptFunction('insertResponsive', insertResponsive);
  eleventyConfig.addJavaScriptFunction('insertImage', insertImage);
  eleventyConfig.addJavaScriptFunction('insertSvg', insertSvg);
  eleventyConfig.addJavaScriptFunction('zeroPadding', zeroPadding);
  eleventyConfig.addJavaScriptFunction('numberFormat', numberFormat);
  eleventyConfig.addJavaScriptFunction('isBlank', isBlank);
  eleventyConfig.addJavaScriptFunction('range', range);
  eleventyConfig.addJavaScriptFunction('relativePath', relativePath);
  eleventyConfig.addJavaScriptFunction('budouxParse', budouxParse);
  global.f = eleventyConfig.javascriptFunctions;
  eleventyConfig.setEjsOptions({
    context: ['f'],
  });

  /* Server */
  eleventyConfig.setServerOptions({
    module: '@11ty/eleventy-server-browsersync',
    open: true,
    notify: false,
    ui: false,
    ghostMode: false,
    callbacks: {
      ready: (_err, browserSync) => {
        const proxy = httpProxy.createProxyServer();

        browserSync.addMiddleware('*', (req, res) => {
          proxy.web(req, res, { target: 'http://127.0.0.1:5173' });
        });
      },
    },
    ...config.browser,
  });

  return {
    dir: {
      input: 'src/site/pages',
      includes: '../includes',
      data: '../data',
      output: `${config.out}/`,
    },
    markdownTemplateEngine: 'ejs',
    htmlTemplateEngine: 'ejs',
    pathPrefix: config.base,
  };
};

/* Util */
const getImageData = (src, isHalf) => {
  const reg = new RegExp(config.assets.images.outPath);
  const imageSrc = src.replace(reg, '');
  const filePath = src.startsWith('/')
    ? path.resolve(imageOutDir, imageSrc.slice(1))
    : path.resolve(imageOutDir, imageSrc);
  const fileExtname = path.extname(src);
  const fileDir = path.dirname(src);
  const fileName = path.basename(src, fileExtname);
  const division = isHalf ? 2 : 1;

  if (fs.existsSync(filePath)) {
    const { width, height, type } = imageSize(filePath);

    return {
      width: type !== 'svg' ? Math.floor(width / division) : Math.floor(width),
      height: type !== 'svg' ? Math.floor(height / division) : Math.floor(height),
      type: type,
      webp: `${fileDir}/${fileName}.webp`,
    };
  } else {
    return false;
  }
};

/* EJS functions */
const insertResponsive = (srcPc, srcSp, cls, alt) => {
  const pc = getImageData(srcPc, true);
  const sp = getImageData(srcSp, false);
  if (!pc || !sp) {
    throw new Error(`Missing \`src\` on insertResponsive from: ${!pc ? srcPc : srcSp}`);
  }

  const addAlt = alt ? alt : '';
  const addClass = cls ? ` class="${cls}"` : '';

  if (pc.type === 'svg') {
    return `<picture${addClass}>
        <source media="(max-width: ${config.screens.mobile - 0.02}px)" srcset="${srcSp}" width="${
          sp.width
        }" height="${sp.height}">
        <img src="${srcPc}" alt="${addAlt}" width="${pc.width}" height="${
          pc.height
        }" loading="lazy" decoding="async">
      </picture>`;
  } else {
    return `<picture${addClass}>
        <source media="(max-width: ${config.screens.mobile - 0.02}px)" srcset="${sp.webp}" width="${
          sp.width
        }" height="${sp.height}" type="image/webp">
        <img src="${pc.webp}" alt="${addAlt}" width="${pc.width}" height="${
          pc.height
        }" loading="lazy" decoding="async">
      </picture>`;
  }
};

const insertImage = (src, cls, alt) => {
  const data = getImageData(src, true);
  if (!data) {
    throw new Error(`Missing \`src\` on insertImage from: ${src}`);
  }

  const { width, height } = data;
  const addAlt = alt ? alt : '';
  const addClass = cls ? ` class=${cls}` : '';

  if (data.type === 'svg') {
    return `
        <img src="${src}" alt="${addAlt}" width="${width}" height="${height}" class="${addClass}">
      `;
  } else {
    return `<picture${addClass}>
        <img src="${data.webp}" alt="${addAlt}" width="${width}" height="${height}">
      </picture>`;
  }
};

const insertSvg = (relativePath, id, cls) => {
  const filePath = path.resolve(svgPath, `${id}.svg`);
  const { width, height } = imageSize(filePath);
  if (!width) return;
  const iconSrc = `${relativePath}${config.assets.sprite.outDir}/${config.assets.sprite.outName}.svg#${id}`;
  const addClass = cls ? ` class="${cls}"` : '';

  return `<svg role="img" viewBox="0 0 ${width} ${height}"${addClass}>
    <use href="${iconSrc}" />
  </svg>`;
};

const zeroPadding = (num, len) => {
  return String(num).padStart(len, '0');
};

const numberFormat = (num) => {
  return num.toLocaleString('ja-JP');
};

const isBlank = (bool = false) => {
  return bool ? ' target="_blank" rel="noopener"' : '';
};

const range = (start, end) => {
  return [...Array(end - start + 1)].map((_, i) => start + i);
};

const relativePath = (filePath) => {
  let depth = filePath.replace(/^.\/src\/site\/pages\//, '').split('/').length - 1;
  let path = 0 < depth ? '../'.repeat(depth) : './';

  return path;
};

const budouxParse = (string) => {
  return parser.translateHTMLString(string);
};
