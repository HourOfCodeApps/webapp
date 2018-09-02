const path = require('path');

const root = path.resolve(__dirname, '../');
const src = path.resolve(root, './src');
const dist = path.resolve(root, './dist');

module.exports = {
  root,
  src,
  dist,
};
