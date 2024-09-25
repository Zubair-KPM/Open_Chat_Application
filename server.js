// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from 'public' directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('message', (data) => {
        io.emit('message', data); // Broadcast message with user info to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3003;
const HOST = 'localhost'; // Define the host
server.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
