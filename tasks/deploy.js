const ghPages = require('gh-pages');
const path = require('path');
const fs = require('fs-extra');

try {
  fs.removeSync(path.resolve(__dirname, '../dist/'));
  fs.copySync(path.resolve(__dirname, '../static/'), path.resolve(__dirname, '../dist/static/'));
  fs.copySync(path.resolve(__dirname, '../.nuxt/'), path.resolve(__dirname, '../dist/.nuxt/'));
  fs.copySync(path.resolve(__dirname, '../package.json'), path.resolve(__dirname, '../dist/package.json'));
  fs.copySync(path.resolve(__dirname, '../tsconfig.json'), path.resolve(__dirname, '../dist/tsconfig.json'));
  fs.copySync(path.resolve(__dirname, '../yarn.lock'), path.resolve(__dirname, '../dist/yarn.lock'));

  ghPages.publish('dist', {
    branch: 'dist',
  }, () => {
    fs.removeSync(path.resolve(__dirname, '../dist/'));
  });
} catch (err) {
  console.error(err);
}
