const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const{generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected')
    
    //socket.emit from admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    //socket.broadcast.emit from Admin text New User Joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'))

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        callback('This is from the server')
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})