const { Server } = require("socket.io");
const socketIo = require("socket.io");

const app = require("../app");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

const startSocketIOConnection = () => {
    server.listen(3004, () => console.log('socket listening on port 3004'))
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
};

const sendMessageToClients = (messageName, args) => {
    io.emit(messageName, args);
};

module.exports = {
    startSocketIOConnection,
    sendMessageToClients
}