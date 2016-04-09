var app = require('http').createServer(handler); 
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(3333);

function handler (req, res) {
  fs.readFile('dist/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

io.on('connection', function (socket) {
  console.log('server connected');
  socket.on('recieved_button_event', function () {
	socket.emit('push_button');	
  });
});
