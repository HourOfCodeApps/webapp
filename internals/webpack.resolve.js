// const path = require('path');

const dirs = require('./dirs');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [dirs.src, 'node_modules'],
  },
};
