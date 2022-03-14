const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const io = require('socket.io');
const socketIo = io(server);
let chatters = [];
socketIo.on('connection', socket => {

    let name;

    socket.on('login', (n, callback) => {
        name = n;
        if (chatters.find(chatter => chatter === n)) {
            return callback('name taken')
        }
        chatters.push({ name, id: socket.id });
        socketIo.emit('allUsers', chatters)


        socket.broadcast.emit('info', `${n} joined`);

        socket.on('message', msg => {
            if (msg.startsWith('@')) {
                const newMessage = msg.split(' ');
                const whoTo = newMessage[0].split('@')[1];
                const message = msg.split(whoTo)[1];
                const sendPrivateTo = chatters.find(c => c.name === whoTo);
                socket.to(sendPrivateTo.id).emit("message", { user: name, msg: message });
            } else {
                socketIo.emit('message', { user: name, msg })
            }
        });

        socket.on('typing', isTyping => {
            chatters = chatters.filter(c => c !== name);
            if(isTyping){
                socketIo.emit('typing', `${name} is typing...`);
            }else{
                socketIo.emit('typing', '');

            }
        });
        socket.on('disconnect', () => {
            chatters = chatters.filter(c => c !== name);
            socketIo.emit('info', `${name} has left the chat`);
        });
        callback();
    });
});


app.use('/', (req, res, next) => {
    res.end('Hello world');
});
server.listen(80)