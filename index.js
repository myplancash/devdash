#!/usr/bin/env node
process.env.UV_THREADPOOL_SIZE = 128;
 
require('@babel/register')({
  presets: [['@babel/preset-env'], ['@babel/preset-react']],
  //We need a special babel plugin for async/await to work in our React and regeneratorRuntime is not define:
  plugins: ['@babel/plugin-transform-runtime']
}) 
require('./dashboard')