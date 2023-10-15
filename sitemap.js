const sitemap = require('nextjs-sitemap-generator');  
const path = require('path');

sitemap({  
  baseUrl: 'https://undust.me',
  pagesDirectory: path.resolve(__dirname, 'pages'),
  targetDirectory : 'public/',
  ignoredExtensions: ['png', 'jpg'],
  ignoredPaths: ['[fallback]'], // Exclude file with [fallback] in the name
});

console.log(`✅ sitemap.xml generated!`);