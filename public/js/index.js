var socket = io()
socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'Dodi',
        text: 'Yup, its works for me'
    })
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', (message) => {
    console.log('newMessage', message)
})
