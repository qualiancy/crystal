module.exports = process.env.crystal_COV
  ? require('./lib-cov/crystal')
  : require('./lib/crystal');
