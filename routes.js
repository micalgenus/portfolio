const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'portfolio', page: 'portfolio', pattern: '/@:id' })
  .add({ name: 'OAuth Login Redirect', page: 'login', pattern: '/login', layout: false })
  .add({ name: 'home', page: 'index', pattern: '/' });
