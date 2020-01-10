const { log } = console;
// initialize http server, socket.io and port number
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const PORT = process.env.PORT || 4001;

server.listen(PORT);

log(`Running on port ${PORT}`);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', (socket) => {
  log('connected');
  socket.on('message', (evt) => {
    log(evt);
    socket.broadcast.emit('message', evt);
  });
});

io.on('disconnect', () => {
  log('some people left');
});
