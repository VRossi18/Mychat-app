const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected' + socket.id);
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', `${socket.id}: ${msg}`);
    });
});

http.listen(3000, () => {
    console.log('Listening on *:3000');
});