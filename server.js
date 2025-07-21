const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Evento cuando alguien se conecta
io.on('connection', (socket) => {
  console.log('👤 Usuario conectado');

  // Recibe mensaje y lo envía a todos los demás
  socket.on('mensaje', (data) => {
    io.emit('mensaje', data);
  });

  socket.on('disconnect', () => {
    console.log('🚪 Usuario desconectado');
  });
});

// Puerto (Render usa uno automático)
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});
