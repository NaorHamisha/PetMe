const { Server } = require("socket.io");

const app = require("../app");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

const startSocketIOConnection = () => {
    server.listen(5555, () => console.log('socket listening on port 5555'))
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