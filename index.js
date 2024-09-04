const express = require('express');
const app = express(); 
const http = require('http');
const server = http.createServer(app) //accepts request handler
const path = require('path');
const socketio = require('socket.io');
const io = socketio(server);//(an obj) this will create a web socket for us as we have put http inside socket


//for static files
app.use('/' , express.static(path.join(__dirname , 'public')));

const users = {}; //obj to store users corresponding to their ids

io.on('connection' , (socket)=>{
    console.log('connection established');

    socket.on('send-msg' , (data)=>{ //getting the message send by the user
        console.log(data.msg); 
        // socket.emit('received-msg' , { // sending back the message send by the user so that it also appears on users screen
        io.emit('received-msg' , { //now we want all the users to see each others messages so we use io(it contains all the sockets)
            msg :data.msg,
            id :socket.id,
            username:users[socket.id]
        })
    })

    socket.on('login' , (data)=>{
        // console.log(data);
        users[socket.id] = data.username;// mapping the socket id with username

    })
})




const port = process.env.PORT || 3000;

server.listen(port , ()=>{
    console.log(`server connected at port ${port}`)
})

