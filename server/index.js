const server = require('./server');
const port   = parseInt(process.env.PORT || 3001)
server.listen(port)
      .on('error',     console.error.bind(console))
      .on('listening', console.log.bind(console, 'Listening on http://0.0.0.0:' + port))
