const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'portfolio', page: 'portfolio', pattern: '/@:id' })
  .add({ name: 'profile', page: 'profile', pattern: '/profile' })
  .add({ name: 'setting', page: 'setting', pattern: '/setting' })
  .add({ name: 'OAuth Login Redirect', page: 'login', pattern: '/login', layout: false })
  .add({ name: 'home', page: 'index', pattern: '/' });
