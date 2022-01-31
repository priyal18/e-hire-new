const express = require('express');
const http = require('http');
const request = require('request');
const app = express();
const path = require('path');

const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server, { cors: { origin: '*' } });

app.use(require('cors')());

app.use(express.static(path.join(__dirname, 'client/build')));

const users = {};

const socketToRoom = {};

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('codeChanged', ([code, roomId]) => {
    socket.broadcast.to(roomId).emit('codeChanged1', code);
  });

  socket.on('outputChanged', ([text, roomId]) => {
    socket.broadcast.to(roomId).emit('outputChanged1', text);
  });

  socket.on('inputChanged', ([text, roomId]) => {
    socket.broadcast.to(roomId).emit('inputChanged1', text);
  });

  socket.on('submit-code', ([data, roomId]) => {
    request(
      {
        url: 'https://api.jdoodle.com/v1/execute',
        method: 'POST',
        json: data,
      },
      function (error, response, body) {
        io.to(roomId).emit('recieve-output', body);
      }
    );
  });

  socket.on('join room', (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit('room full');
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit('all users', usersInThisRoom);
  });

  socket.on('sending signal', (payload) => {
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on('returning signal', (payload) => {
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(process.env.PORT || 5000);

//server.listen(5000);
