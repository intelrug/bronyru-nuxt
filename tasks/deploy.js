const ghPages = require('gh-pages');

ghPages.publish('./', {
  src: [
    '.nuxt/**/*',
    'static/**/*',
    'package.json',
    'tsconfig.json',
    'yarn.lock',
  ],
  branch: 'dist',
}, (e) => {
  if (e) {
    console.error(e);
  }
});
