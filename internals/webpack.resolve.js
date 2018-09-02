const dirs = require('./dirs');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [dirs.src, 'node_modules'],
  },
};
