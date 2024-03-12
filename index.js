const express = require('express'); 
const app = express(); 
const { Server } = require('socket.io'); 
const http = require('http'); 
const server = http.createServer(app); 
const io = new Server(server); 
const port = 5000; 

app.use(express.static('public')); // Serve static files

app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html'); 
}); 

io.on('connection', (socket) => { 
    socket.on('send chat', ({name, message}) => { 
        io.emit('chat message', {name, message});
    }); 
}); 

server.listen(port, () => { 
    console.log(`Server is listening at http://localhost:${port}`); 
});

