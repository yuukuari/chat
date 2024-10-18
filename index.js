const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir les fichiers statiques (HTML, CSS, JS) à partir du dossier "public"
app.use(express.static(__dirname + '/public'));

// Gérer les connexions WebSocket
io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');

    // Lorsque le serveur reçoit un message depuis un client
    socket.on('chatMessage', (data) => {
        // Diffuser le message à tous les clients, incluant le nom de l'utilisateur
        io.emit('chatMessage', {
            name: data.name,
            message: data.message
        });
    });

    // Lorsque l'utilisateur se déconnecte
    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

// Démarrer le serveur sur le port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
