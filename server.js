const app = require('express')();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());

io.on('connection', function(socket){
  socket.on('enter_room', data => {
    console.log(`user ${data.user_id} enter into game room ${data.room_id}`);
    socket.join(data.room_id);
    io.to(data.room_id).emit('message', `${data.user_id} enter into game room!`);
  });
  socket.on('message', data => {
    io.to(data.room_id).emit('message', `${data.user_id} says: ${data.msg}`);
  });
  socket.on('ready', data => {
    io.to(data.room_id).emit('message', `${data.user_id} is ready for game!`);
    io.to(data.room_id).emit('ready', data);
  });
});

server.listen(2434, () => console.log('start!'));