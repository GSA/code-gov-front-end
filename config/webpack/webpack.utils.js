const { copyFileSync, existsSync, readFileSync } = require('fs');
const { join } = require('path');

function copyOverPluginIfNecessary(plugin, nodeModulesDir, pluginsDir) {
  const packageDir = join(nodeModulesDir, plugin.component);
  const relativeMainPath = require(join(packageDir, 'package.json')).main;
  const absoluteMainPath = join(packageDir, relativeMainPath);
  const to = join(pluginsDir, plugin.filename);
  const inFileText = readFileSync(absoluteMainPath, 'utf-8');
  const shouldCopy = (!existsSync(to)) || (inFileText !== readFileSync(to, 'utf-8'));
  console.log(`checking if text of ${plugin.component} has changed`);
  if (shouldCopy) {
    console.log(`\tinstalling plugin from ${absoluteMainPath} to ${to}`);
    copyFileSync(absoluteMainPath, to);
  }
}
module.exports = { copyOverPluginIfNecessary };