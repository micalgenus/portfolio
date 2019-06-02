const { createServer } = require('http');
const next = require('next');
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

// app
//   .prepare()
//   .then(() => {
//     const server = express();
//     server.use(compression());

//     // Route all other urls to next "as is" - see note above about /next/ and /webpack/
//     server.get('*', (req, res) => {
//       return handle(req, res);
//     });

//     server.listen(port, err => {
//       if (err) throw err;
//       console.log(`> Ready on http://localhost:${port}`);
//     });
//   })
//   .catch(ex => {
//     console.error(ex.stack);
//     process.exit(1);
//   });

app.prepare().then(() => {
  createServer(handler).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${port}`);
  });
});
