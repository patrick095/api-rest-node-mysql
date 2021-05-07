require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const PORT = process.env.PORT;
const app = require("./app");

//socket io 
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { 
        origin: "*" , 
        methods: [ "GET" , "POST" ]
       } 
});
server.listen(PORT, ()=>{
    console.log("server listening at port "+PORT);
});
require('./controllers/chatController').io(io);
module.exports= {server, io}