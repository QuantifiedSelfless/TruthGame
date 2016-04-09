var app = require('http').createServer(handler)
var io = require('socket.io')(app);

app.listen(80);


io.on('connection', function (socket) {
    console.log('server connected');
    socket.on('push_button', function (data) {
        if (data) socket.emit('push_button_true')
        else socket.emit('push_button_false')
    }
  });
});
