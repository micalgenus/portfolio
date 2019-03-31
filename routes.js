const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'portfolio', page: 'portfolio', pattern: '/@:id' })
  .add({ name: 'home', page: 'index', pattern: '/' });
