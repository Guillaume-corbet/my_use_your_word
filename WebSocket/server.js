const {instrument} = require("@socket.io/admin-ui");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const io = require("socket.io")(process.env.ENV == "production" ? process.env.WEB_SOCKET_PROD_PORT : process.env.WEB_SOCKET_DEV_PORT, {
    cors: {
        origin: ["*"],
    },
})

const userConnected = [

];

const room = [

];

const addUser = (socketId, server) => {
    userConnected.push({socketId: socketId, server: server});
    return;
}

const removeUser = (socketId) => {
    userConnected = userConnected.filter(function(ele) {
        return ele.socketId != socketId;
    });
}

const addRoom = (socketId, code) => {
    room.push({code: code, user: [{id: socketId, server: true}]})
    return;
}

const generateCodeRoom = () => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let find = true
    let result = ""
    while (!true) {
        find = false
        result = ""
        for ( var i = 0; i < 5; i++ ) {
            result += chars.charAt(Math.floor(Math.random() * chars.length)); 
        }
        for (var i = 0; i < room.length; i++) {
            if (room.at(i).code == result)
                find = true
        }
    }
    return (result)
}

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("Connect", (server) => {
        addUser(socket.id, server);
        console.log(server)
        socket.emit("Connected", {token: tokenWs});
    })

    socket.on("createRoom", () => {
        let code = generateCodeRoom();
        addRoom(socket.id, code);
        socket.emit("RoomCreated", {code: code})
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
    })

})

instrument(io, {auth: false})
console.log("Server listening port ");
console.log(process.env.ENV == "production" ? process.env.WEB_SOCKET_PROD_PORT : process.env.WEB_SOCKET_DEV_PORT);