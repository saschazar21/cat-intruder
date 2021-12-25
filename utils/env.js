const { resolve } = require('path');
const { readFileSync } = require('fs');

const envPath = resolve(process.cwd(), '.env');
const envContents = readFileSync(envPath, 'utf8');

const custom = envContents
  .replace(/^#.*$/gm, '')
  .split('\n')
  .filter(line => line.length > 0)
  .reduce((env, current) => {
    const [key, value] = current.split('=');
    value && value.length > 0 && (env[key] = value);
    return env;
  }, {});

module.exports = custom;
