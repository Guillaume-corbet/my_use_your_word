const {instrument} = require("@socket.io/admin-ui");
const dotenv = require('dotenv');
dotenv.config();
const io = require("socket.io")(4000, {
    cors: {
        origin: ["http://localhost:3000"],
    },
})

let room = {
    "use": [

    ],
    "quiz": [

    ]
};

const removeUser = (game, socketId, socket) => {
    for (let x = 0; x < room[game].length; x++) {
        for (let y = 0; y < room[game].at(x).user.length; y++) {
            if (room[game].at(x).user.at(y).id == socketId) {
                if (room[game].at(x).user.at(y).server) {
                    console.log("Room " + room[game].at(x).code + " disconnected")
                    socket.in(room[game].at(x).code).disconnectSockets();
                } else {
                    console.log("User " + room[game].at(x).user.at(y).playerName + " disconnected")
                    socket.disconnect();
                }
            }
        }
    }
}

const addRoom = (game, socketId, code) => {
    room[game].push({code: code, user: [{id: socketId, server: true, playerName: null}]})
    return;
}

const joinRoom = (game, socketId, code, playerName) => {
    for (var i = 0; i < room[game].length; i++) {
        if (room[game].at(i).code == code) {
            for (var x = 0; x < room[game].at(i).user.length; x++) {
                if (room[game].at(i).user.at(x).playerName == playerName)
                    return ("Already Exist");
            }
            room[game].at(i).user.push({id: socketId, server: false, playerName: playerName})
            return "Room found";
        }
    }
    return ("No Room");
}

const generateCodeRoom = (game) => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let find = true
    let result = ""
    while (find) {
        find = false
        result = ""
        for ( var i = 0; i < 5; i++ ) {
            result += chars.charAt(Math.floor(Math.random() * chars.length)); 
        }
        for (var i = 0; i < room[game].length; i++) {
            if (room[game].at(i).code == result)
                find = true
        }
    }
    return (result)
}

const useWS = io.of('/use_your_word')

useWS.on("connection", (socket) => {
    console.log("a user connected use your word");

    socket.on("Connect", () => {
        socket.emit("Connected");
    })

    socket.on("createRoom", () => {
        let code = generateCodeRoom("use");
        addRoom("use", socket.id, code);
        socket.join(code)
        socket.emit("RoomCreated", {code: code})
    })

    socket.on("joinRoom", (data) => {
        res = joinRoom("use", socket.id, data.code, data.playerName);
        if (res == "No Room") {
            socket.emit("NoRoom")
        } else if (res == "Already Exist") {
            socket.emit("UserAlreadyExist")
        } else {
            socket.to(data.code).emit("UserJoined", data.playerName)
            socket.join(data.code)
            socket.emit("RoomJoined")
        }
    })

    socket.on("disconnect", () => {
        removeUser("use", socket.id, socket);
    })

})

const quizzWS = io.of('/quiz')

quizzWS.on("connection", (socket) => {
    console.log("a user connected on quiz");

    socket.on("Connect", () => {
        socket.emit("Connected");
    })

    socket.on("disconnect", () => {
        removeUser("use", socket.id, socket);
    })

})

instrument(io, {auth: false})
console.log("Server listening port ", 4000);