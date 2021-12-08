#!/usr/bin/env node

const { getCanRunPackageDirectoryNames } = require('../utils/packages');
const { run } = require('./commands');

(async () => {
  const directoryNames = getCanRunPackageDirectoryNames();
  run({ directoryNames, npmScriptName: 'build' });
})();
