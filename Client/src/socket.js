import { io } from 'socket.io-client';

let socket = null;
let gameSocket = null;

const connectWs = (gameSockets) => {
    if (gameSockets == "use") {
        gameSocket = gameSockets
        socket = io("http://localhost:4000/use_your_word")
    } else if (gameSockets == "quiz") {
        gameSocket = gameSockets
        socket = io("http://localhost:4000/quiz")
    } else {
        gameSocket = null
        socket = null
    }
}

export {connectWs, socket, gameSocket} ;