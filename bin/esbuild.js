#!/usr/bin/env node

const { resolve } = require('path');
const { build } = require('esbuild');
const custom = require('../utils/env');

const env = {
  ...process.env,
  ...custom(),
};

const define = Object.keys(env).reduce((vars, key) => {
  vars[`import.meta.env.${key}`] = JSON.stringify(env[key]);
  return vars;
}, {});

const options = {
  entryPoints: [resolve(process.cwd(), './worker/index.ts')],
  outfile: resolve(process.cwd(), './dist/worker.js'),
  bundle: true,
  platform: 'browser',
  minify: process.env.NODE_ENV === 'production',
  define,
};

build(options).catch(error => {
  console.error(error);
  process.exit(1);
});
