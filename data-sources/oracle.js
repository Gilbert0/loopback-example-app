/**
 * Dependencies
 */

var asteroid = require('asteroid');

if(process.env.NODE_ENV === 'test') {
  console.log('-----TEST-----');
  
  // use memory adapter
  module.exports = asteroid.createDataSource({
    connector: require('asteroid').Memory
  });
  
  // import data
  require('../test-data/import');
} else {
  // export the oracle data source
  module.exports = asteroid.createDataSource({
    connector: require('jugglingdb-oracle'),
    host: '166.78.158.45',
    database: 'XE',
    username: 'blackpool',
    password: 'str0ng100pjs',
    debug: false
  });
}