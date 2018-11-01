const path = require('path');

const dirs = require('./dirs');

module.exports = {
  resolve: {
    alias: {
      config: path.resolve(dirs.src, 'config', process.env.NODE_ENV === 'production' ? 'production.js' : 'development.js'),
    },
    extensions: ['.js', '.jsx'],
    modules: [dirs.src, 'node_modules'],
  },
};
