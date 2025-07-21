const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public')); // Carpeta donde está tu index.html

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('mensaje', (msg) => {
    io.emit('mensaje', msg); // Reenvía el mensaje a todos
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});
