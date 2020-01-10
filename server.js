const { log } = console;
// initialize http server, socket.io and port number
var app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const HOST = '0.0.0.0';
const PORT = 8080;

server.listen(PORT, HOST);

log(`Running on http://${HOST}:${PORT}`);

app.get('/', function(req, res) {
  res.send("It's working!");
});

io.on('connection', (socket) => {
  log('connected');
  socket.on('message', (evt) => {
    log(evt);
    socket.broadcast.emit('message', evt);
  });
});

io.on('disconnect', (evt) => {
  log('some people left');
});
