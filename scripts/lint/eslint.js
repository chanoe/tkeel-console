const path = require('path');
const { readPackageInfos } = require('../utils/packages');
const { runESLint } = require('./exec');

const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });
const files = '**/*.{js,ts,tsx}';

runESLint({ cwd: path.resolve(__dirname, '../..'), files });

packageInfos.forEach(({ absolutePath }) =>
  runESLint({ cwd: absolutePath, files })
);
