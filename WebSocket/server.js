const {instrument} = require("@socket.io/admin-ui");
const dotenv = require('dotenv');
dotenv.config();
const io = require("socket.io")(4000, {
    cors: {
        origin: ["http://localhost:3000"],
    },
})

let userConnected = [

];

let room = [

];

const addUser = (socketId) => {
    userConnected.push({socketId: socketId});
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

const joinRoom = (socketId, code) => {
    for (var i = 0; i < room.length; i++) {
        if (room.at(i).code == code) {
            room.at(i).user.push({id: socketId, server: false})
            return room.at(i);
        }
    }
    return "No Room";
}

const generateCodeRoom = () => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let find = true
    let result = ""
    while (find) {
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
        addUser(socket.id);
        socket.emit("Connected");
    })

    socket.on("createRoom", () => {
        let code = generateCodeRoom();
        addRoom(socket.id, code);
        socket.join(code)
        socket.emit("RoomCreated", {code: code})
    })

    socket.on("joinRoom", (code) => {
        res = joinRoom(socket.id, code);
        console.log(res)
        if (res == "No Room") {
            socket.emit("NoRoom")
        } else {
            socket.join(code)
            socket.emit("RoomJoined", {res: "Oui bien sur"})
        }
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
    })

})

instrument(io, {auth: false})
console.log("Server listening port ");
console.log(4000);