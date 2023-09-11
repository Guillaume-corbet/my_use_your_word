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
    const tokenWs = jwt.sign(
        {
        },
        process.env.RANDOM_STRING_WS,
        {
            expiresIn: 360000
        }
    )
    userConnected.push({socketId: socketId, tokenWs: tokenWs, server: server});
    return (tokenWs);
}

const removeUser = (socketId) => {
    userConnected = userConnected.filter(function(ele) {
        return ele.socketId != socketId;
    });
}

const verifWs = (socketId, token) => {
    try {
        jwt.verify(token, process.env.RANDOM_STRING_WS);
        return (true);
    } catch (err) {
        removeUser(socketId);
        return (false);
    }
}

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("Connect", (server) => {
        const tokenWs = addUser(socket.id, server);
        console.log(server)
        socket.emit("Connected", {token: tokenWs});
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
    })

})

instrument(io, {auth: false})
console.log("Server listening port ");
console.log(process.env.ENV == "production" ? process.env.WEB_SOCKET_PROD_PORT : process.env.WEB_SOCKET_DEV_PORT);