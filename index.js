const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');

    // Lorsqu'un message est reçu de l'un des clients
    socket.on('chatMessage', (msg) => {
        // Envoyer le message à tous les clients
        io.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
