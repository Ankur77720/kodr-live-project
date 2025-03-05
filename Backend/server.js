const app = require('./src/app');
const connect = require('./src/db/db');

connect();


const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', socket => {

    const projectId = socket.handshake.query.projectId

    socket.join(projectId)

    console.log('New client connected');

    socket.on("chacha", msg => {
        console.log(msg)
        socket.to(projectId).emit('chacha', msg)
    })

});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

