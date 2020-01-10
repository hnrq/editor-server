const { log } = console;
// initialize http server, socket.io and port number
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 4001;

server.listen(PORT, HOST);

log(`Running on port ${HOST}:${PORT}`);

const root = require('path').join(__dirname, 'client', 'build');
app.use(express.static(root));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

io.on('connection', (socket) => {
  log('connected');
  socket.on('message', (evt) => {
    log(evt);
    socket.broadcast.emit('message', evt);
  });
});

process.on('SIGINT', function() {
  server.close();
  process.exit();
});

io.on('disconnect', () => {
  log('some people left');
});
