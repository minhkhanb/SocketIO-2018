var express = require('express')
var mongooes = require('mongoose');
var dbUrl = 'mongodb://<admin>:<chat123>@ds113134.mlab.com:13134/single-chat'

var app = express();

app.use(express.static(__dirname + '/static'));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

mongooes.connect(dbUrl, function(err) {
  console.log('mongodb connected', err);
});

var Message = mongooes.model('Message', { name: String, message: String });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('chat message: ', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  })
});

http.listen(port, function(){
  console.log('server is running on port', port);
});