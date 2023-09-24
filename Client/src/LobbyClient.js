import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {socket, connectWs, gameSocket} from "./socket";

function LobbyClient() {

    let {game, code} = useParams();
    let {state} = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
  
      if (socket == null || gameSocket != "use")
        connectWs("use")

      const test = () => {
        console.log("room joined")
      }

      const NoRoom = () => {
        navigate('../joinGame/' + game, {state: {error: "Error room code"}})
      }
  
      const UserAlreadyExist = () => {
        navigate('../joinGame/' + game, {state: {error: "User already exist"}})
      }
      
      socket.emit("joinRoom", {code: code, playerName: state.playerName});
      socket.on("RoomJoined", test)
      socket.on("NoRoom", NoRoom)
      socket.on("UserAlreadyExist", UserAlreadyExist)
      return () => {
        socket.off('RoomJoined', test)
        socket.off('NoRoom', NoRoom)
        socket.off("UserAlreadyExist", UserAlreadyExist)
      }
    }, [])

    return (
      <Link to="../">
        <Button variant="contained" color="success">
          {game}, {code}
        </Button>
      </Link>
    )
}

export default LobbyClient;