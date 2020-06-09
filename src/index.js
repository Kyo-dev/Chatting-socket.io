const path = require('path')
const express = require('express')
const SocketIO = require('socket.io')
const app  = express()

// setting
app.set('port', process.env.PORT || 3000)

// run server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port => ' + app.get('port'))
})

const io = SocketIO(server)
// websockets
io.on('connect', (socket) => {
    console.log('new connecion from socket io server', socket.id)
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:messageServer', data)
    })

    socket.on('chat:typing', (data) =>{
        // without me broadcast
        socket.broadcast.emit('chat:typingServer', data)
    })
})



// static files
// console.log(`${__dirname}\\public`)
// console.log(path.join(__dirname, '../public')) 
app.use(express.static(path.join(__dirname, 'public')))

